import {
  index,
  integer,
  jsonb,
  smallint,
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
  leadChannelEnum,
  leadStatusEnum,
  notifyViaEnum,
  reviewModerationEnum,
  viewingStatusEnum,
} from '@/db/schema/enums.js'
import { agentProfiles, organizations, users } from '@/db/schema/identity.js'

export const savedListings = snakeCase.table(
  'saved_listings',
  {
    createdAt: createdAtColumn(),
    id: idColumn(),
    listingId: uuid()
      .notNull()
      .references(() => listings.id, { onDelete: 'cascade' }),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (t) => [
    unique('saved_listings_user_listing').on(t.userId, t.listingId),
    index('saved_listings_listing_idx').on(t.listingId),
  ]
)

export const compareSets = snakeCase.table(
  'compare_sets',
  {
    createdAt: createdAtColumn(),
    id: idColumn(),
    name: varchar({ length: 80 }),
    updatedAt: updatedAtColumn(),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (t) => [index('compare_sets_user_idx').on(t.userId)]
)

export const compareItems = snakeCase.table(
  'compare_items',
  {
    createdAt: createdAtColumn(),
    id: idColumn(),
    listingId: uuid()
      .notNull()
      .references(() => listings.id, { onDelete: 'cascade' }),
    setId: uuid()
      .notNull()
      .references(() => compareSets.id, { onDelete: 'cascade' }),
    sortOrder: integer().notNull().default(0),
  },
  (t) => [
    unique('compare_items_set_listing').on(t.setId, t.listingId),
    index('compare_items_listing_idx').on(t.listingId),
  ]
)

export const savedSearches = snakeCase.table(
  'saved_searches',
  {
    createdAt: createdAtColumn(),
    filters: jsonb().$type<Record<string, unknown>>().notNull(),
    id: idColumn(),
    lastNotifiedAt: timestamp({ mode: 'date', withTimezone: true }),
    name: varchar({ length: 120 }).notNull(),
    notifyVia: notifyViaEnum().notNull().default('email'),
    updatedAt: updatedAtColumn(),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (t) => [
    index('saved_searches_user_idx').on(t.userId),
    index('saved_searches_filters_gin').using('gin', t.filters),
  ]
)

export const recentlyViewed = snakeCase.table(
  'recently_viewed',
  {
    id: idColumn(),
    listingId: uuid()
      .notNull()
      .references(() => listings.id, { onDelete: 'cascade' }),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    viewedAt: timestamp({ mode: 'date', withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    unique('recently_viewed_user_listing').on(t.userId, t.listingId),
    index('recently_viewed_user_viewed_idx').on(t.userId, t.viewedAt),
  ]
)

export const leads = snakeCase.table(
  'leads',
  {
    agentUserId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    assignedToUserId: uuid().references(() => users.id, {
      onDelete: 'set null',
    }),
    channel: leadChannelEnum().notNull().default('form'),
    createdAt: createdAtColumn(),
    email: varchar({ length: 255 }),
    fromUserId: uuid().references(() => users.id, { onDelete: 'set null' }),
    id: idColumn(),
    listingId: uuid()
      .notNull()
      .references(() => listings.id, { onDelete: 'restrict' }),
    message: text(),
    name: varchar({ length: 160 }),
    orgId: uuid()
      .notNull()
      .references(() => organizations.id, { onDelete: 'restrict' }),
    phone: varchar({ length: 32 }),
    source: varchar({ length: 80 }),
    status: leadStatusEnum().notNull().default('new'),
    updatedAt: updatedAtColumn(),
    utm: jsonb().$type<Record<string, unknown>>(),
  },
  (t) => [
    index('leads_listing_idx').on(t.listingId),
    index('leads_org_status_idx').on(t.orgId, t.status),
    index('leads_agent_idx').on(t.agentUserId),
    index('leads_assigned_idx').on(t.assignedToUserId),
  ]
)

export const leadEvents = snakeCase.table(
  'lead_events',
  {
    actorUserId: uuid().references(() => users.id, { onDelete: 'set null' }),
    body: text(),
    createdAt: createdAtColumn(),
    id: idColumn(),
    kind: varchar({ length: 40 }).notNull(),
    leadId: uuid()
      .notNull()
      .references(() => leads.id, { onDelete: 'cascade' }),
  },
  (t) => [index('lead_events_lead_idx').on(t.leadId, t.createdAt)]
)

export const viewings = snakeCase.table(
  'viewings',
  {
    createdAt: createdAtColumn(),
    id: idColumn(),
    leadId: uuid()
      .notNull()
      .references(() => leads.id, { onDelete: 'cascade' }),
    listingId: uuid()
      .notNull()
      .references(() => listings.id, { onDelete: 'restrict' }),
    notes: text(),
    scheduledAt: timestamp({ mode: 'date', withTimezone: true }).notNull(),
    status: viewingStatusEnum().notNull().default('requested'),
    updatedAt: updatedAtColumn(),
  },
  (t) => [
    index('viewings_listing_scheduled_idx').on(t.listingId, t.scheduledAt),
    index('viewings_lead_idx').on(t.leadId),
  ]
)

export const agentReviews = snakeCase.table(
  'agent_reviews',
  {
    agentProfileId: uuid()
      .notNull()
      .references(() => agentProfiles.id, { onDelete: 'cascade' }),
    body: text(),
    createdAt: createdAtColumn(),
    id: idColumn(),
    leadId: uuid().references(() => leads.id, { onDelete: 'set null' }),
    moderationStatus: reviewModerationEnum().notNull().default('pending'),
    rating: smallint().notNull(),
    reviewerUserId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    updatedAt: updatedAtColumn(),
  },
  (t) => [
    unique('agent_reviews_reviewer_agent').on(
      t.reviewerUserId,
      t.agentProfileId
    ),
    index('agent_reviews_agent_idx').on(t.agentProfileId),
  ]
)
