import {
  boolean,
  index,
  integer,
  numeric,
  snakeCase,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import {
  createdAtColumn,
  deletedAtColumn,
  idColumn,
  updatedAtColumn,
} from '@/db/columns.js'
import {
  areaUnitEnum,
  orgMemberRoleEnum,
  orgMemberStatusEnum,
  orgStatusEnum,
  orgTypeEnum,
  platformRoleEnum,
  userStatusEnum,
  verificationStatusEnum,
} from '@/db/schema/enums.js'
import { cities, communities, countries } from '@/db/schema/geography.js'

export const users = snakeCase.table(
  'users',
  {
    avatarUrl: text(),
    cognitoSub: varchar({ length: 128 }).notNull().unique(),
    createdAt: createdAtColumn(),
    deletedAt: deletedAtColumn(),
    displayName: varchar({ length: 160 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    id: idColumn(),
    lastLoginAt: timestamp({ mode: 'date', withTimezone: true }),
    locale: varchar({ length: 12 }).notNull().default('en'),
    phone: varchar({ length: 32 }),
    platformRole: platformRoleEnum().notNull().default('user'),
    preferredAreaUnit: areaUnitEnum().notNull().default('sqm'),
    preferredCurrency: varchar({ length: 3 }).notNull().default('AED'),
    status: userStatusEnum().notNull().default('active'),
    timezone: varchar({ length: 64 }).notNull().default('Asia/Dubai'),
    updatedAt: updatedAtColumn(),
  },
  (t) => [index('users_status_idx').on(t.status)]
)

export const organizations = snakeCase.table(
  'organizations',
  {
    cityId: uuid().references(() => cities.id, { onDelete: 'set null' }),
    countryId: uuid().references(() => countries.id, { onDelete: 'set null' }),
    coverUrl: text(),
    createdAt: createdAtColumn(),
    deletedAt: deletedAtColumn(),
    email: varchar({ length: 255 }),
    id: idColumn(),
    legalName: varchar({ length: 200 }).notNull(),
    licenseAuthority: varchar({ length: 120 }),
    licenseCountryId: uuid().references(() => countries.id, {
      onDelete: 'set null',
    }),
    licenseNumber: varchar({ length: 80 }),
    logoUrl: text(),
    phone: varchar({ length: 32 }),
    slug: varchar({ length: 160 }).notNull().unique(),
    status: orgStatusEnum().notNull().default('active'),
    tradeName: varchar({ length: 200 }).notNull(),
    type: orgTypeEnum().notNull(),
    updatedAt: updatedAtColumn(),
    verificationStatus: verificationStatusEnum()
      .notNull()
      .default('unverified'),
    website: varchar({ length: 255 }),
  },
  (t) => [
    index('organizations_type_status_idx').on(t.type, t.status),
    index('organizations_city_idx').on(t.cityId),
  ]
)

export const orgMembers = snakeCase.table(
  'org_members',
  {
    createdAt: createdAtColumn(),
    id: idColumn(),
    invitedAt: timestamp({ mode: 'date', withTimezone: true }),
    jobTitle: varchar({ length: 120 }),
    joinedAt: timestamp({ mode: 'date', withTimezone: true }),
    orgId: uuid()
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    role: orgMemberRoleEnum().notNull(),
    status: orgMemberStatusEnum().notNull().default('invited'),
    updatedAt: updatedAtColumn(),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (t) => [
    unique('org_members_org_user').on(t.orgId, t.userId),
    index('org_members_user_idx').on(t.userId),
    index('org_members_org_role_idx').on(t.orgId, t.role),
  ]
)

export const agentProfiles = snakeCase.table(
  'agent_profiles',
  {
    activeListingCount: integer().notNull().default(0),
    bio: text(),
    createdAt: createdAtColumn(),
    deletedAt: deletedAtColumn(),
    id: idColumn(),
    isSuperAgent: boolean().notNull().default(false),
    isVerified: boolean().notNull().default(false),
    languages: text().array().notNull().default([]),
    licenseNumber: varchar({ length: 80 }),
    orgId: uuid()
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    ratingAvg: numeric({ precision: 3, scale: 2 }).notNull().default('0'),
    reviewCount: integer().notNull().default(0),
    slug: varchar({ length: 160 }).notNull().unique(),
    updatedAt: updatedAtColumn(),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' })
      .unique(),
    whatsapp: varchar({ length: 32 }),
  },
  (t) => [
    index('agent_profiles_org_idx').on(t.orgId),
    unique('agent_profiles_org_user').on(t.orgId, t.userId),
  ]
)

export const agentServiceAreas = snakeCase.table(
  'agent_service_areas',
  {
    agentProfileId: uuid()
      .notNull()
      .references(() => agentProfiles.id, { onDelete: 'cascade' }),
    communityId: uuid()
      .notNull()
      .references(() => communities.id, { onDelete: 'cascade' }),
    createdAt: createdAtColumn(),
    id: idColumn(),
  },
  (t) => [
    unique('agent_service_areas_agent_community').on(
      t.agentProfileId,
      t.communityId
    ),
    index('agent_service_areas_community_idx').on(t.communityId),
  ]
)
