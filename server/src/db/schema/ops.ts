import {
  index,
  integer,
  jsonb,
  numeric,
  snakeCase,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { createdAtColumn, idColumn, updatedAtColumn } from '@/db/columns.js'
import { listings } from '@/db/schema/catalog.js'
import {
  creditTransactionTypeEnum,
  moderationDecisionEnum,
  orgSubscriptionStatusEnum,
  promotionKindEnum,
  subscriptionIntervalEnum,
} from '@/db/schema/enums.js'
import { organizations, users } from '@/db/schema/identity.js'

export const listingModerationQueue = snakeCase.table(
  'listing_moderation_queue',
  {
    createdAt: createdAtColumn(),
    decision: moderationDecisionEnum(),
    id: idColumn(),
    listingId: uuid()
      .notNull()
      .references(() => listings.id, { onDelete: 'cascade' }),
    notes: text(),
    reviewedAt: timestamp({ mode: 'date', withTimezone: true }),
    reviewerId: uuid().references(() => users.id, { onDelete: 'set null' }),
    updatedAt: updatedAtColumn(),
  },
  (t) => [
    index('listing_moderation_queue_listing_idx').on(t.listingId),
    index('listing_moderation_queue_reviewer_idx').on(t.reviewerId),
  ]
)

export const auditLogs = snakeCase.table(
  'audit_logs',
  {
    action: varchar({ length: 80 }).notNull(),
    actorUserId: uuid().references(() => users.id, { onDelete: 'set null' }),
    after: jsonb().$type<Record<string, unknown>>(),
    before: jsonb().$type<Record<string, unknown>>(),
    createdAt: createdAtColumn(),
    entityId: uuid().notNull(),
    entityType: varchar({ length: 80 }).notNull(),
    id: idColumn(),
    ip: varchar({ length: 64 }),
    userAgent: text(),
  },
  (t) => [
    index('audit_logs_entity_idx').on(t.entityType, t.entityId),
    index('audit_logs_actor_idx').on(t.actorUserId, t.createdAt),
  ]
)

export const subscriptionPlans = snakeCase.table('subscription_plans', {
  createdAt: createdAtColumn(),
  currency: varchar({ length: 3 }).notNull().default('AED'),
  features: jsonb().$type<Record<string, unknown>>(),
  id: idColumn(),
  interval: subscriptionIntervalEnum().notNull().default('monthly'),
  listingLimit: integer(),
  name: varchar({ length: 80 }).notNull(),
  priceAmount: numeric({ precision: 15, scale: 2 }).notNull(),
  slug: varchar({ length: 80 }).notNull().unique(),
  updatedAt: updatedAtColumn(),
})

export const orgSubscriptions = snakeCase.table(
  'org_subscriptions',
  {
    createdAt: createdAtColumn(),
    currentPeriodEnd: timestamp({ mode: 'date', withTimezone: true }),
    currentPeriodStart: timestamp({ mode: 'date', withTimezone: true }),
    id: idColumn(),
    orgId: uuid()
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    planId: uuid()
      .notNull()
      .references(() => subscriptionPlans.id, { onDelete: 'restrict' }),
    status: orgSubscriptionStatusEnum().notNull().default('trialing'),
    updatedAt: updatedAtColumn(),
  },
  (t) => [
    index('org_subscriptions_org_idx').on(t.orgId),
    index('org_subscriptions_plan_idx').on(t.planId),
  ]
)

export const creditWallets = snakeCase.table('credit_wallets', {
  balance: numeric({ precision: 15, scale: 2 }).notNull().default('0'),
  createdAt: createdAtColumn(),
  currency: varchar({ length: 3 }).notNull().default('AED'),
  id: idColumn(),
  orgId: uuid()
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' })
    .unique(),
  updatedAt: updatedAtColumn(),
})

export const creditTransactions = snakeCase.table(
  'credit_transactions',
  {
    amount: numeric({ precision: 15, scale: 2 }).notNull(),
    createdAt: createdAtColumn(),
    id: idColumn(),
    listingId: uuid().references(() => listings.id, { onDelete: 'set null' }),
    reason: varchar({ length: 160 }),
    type: creditTransactionTypeEnum().notNull(),
    walletId: uuid()
      .notNull()
      .references(() => creditWallets.id, { onDelete: 'cascade' }),
  },
  (t) => [
    index('credit_transactions_wallet_idx').on(t.walletId, t.createdAt),
    index('credit_transactions_listing_idx').on(t.listingId),
  ]
)

export const listingPromotions = snakeCase.table(
  'listing_promotions',
  {
    createdAt: createdAtColumn(),
    endsAt: timestamp({ mode: 'date', withTimezone: true }).notNull(),
    id: idColumn(),
    kind: promotionKindEnum().notNull(),
    listingId: uuid()
      .notNull()
      .references(() => listings.id, { onDelete: 'cascade' }),
    startsAt: timestamp({ mode: 'date', withTimezone: true }).notNull(),
  },
  (t) => [
    unique('listing_promotions_listing_kind_start').on(
      t.listingId,
      t.kind,
      t.startsAt
    ),
    index('listing_promotions_active_idx').on(t.listingId, t.endsAt),
  ]
)
