import { sql } from 'drizzle-orm'
import {
  boolean,
  char,
  date,
  doublePrecision,
  index,
  integer,
  jsonb,
  numeric,
  smallint,
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
  completionStatusEnum,
  furnishingEnum,
  listingCategoryEnum,
  listingPurposeEnum,
  listingQualityEnum,
  listingStatusEnum,
  mediaKindEnum,
  occupancyEnum,
  pricePeriodEnum,
  verificationStatusEnum,
} from '@/db/schema/enums.js'
import {
  adminDivisions,
  cities,
  communities,
  countries,
  geographyPoint,
  subCommunities,
} from '@/db/schema/geography.js'
import { organizations, users } from '@/db/schema/identity.js'
import { projects } from '@/db/schema/projects.js'

export const buildings = snakeCase.table(
  'buildings',
  {
    amenityCodes: text().array().notNull().default([]),
    communityId: uuid()
      .notNull()
      .references(() => communities.id, { onDelete: 'restrict' }),
    createdAt: createdAtColumn(),
    deletedAt: deletedAtColumn(),
    developerOrgId: uuid().references(() => organizations.id, {
      onDelete: 'set null',
    }),
    floors: integer(),
    geog: geographyPoint(),
    id: idColumn(),
    lat: doublePrecision(),
    lng: doublePrecision(),
    name: varchar({ length: 200 }).notNull(),
    slug: varchar({ length: 160 }).notNull(),
    subCommunityId: uuid().references(() => subCommunities.id, {
      onDelete: 'set null',
    }),
    updatedAt: updatedAtColumn(),
    yearBuilt: integer(),
  },
  (t) => [
    unique('buildings_community_slug').on(t.communityId, t.slug),
    index('buildings_community_idx').on(t.communityId),
    index('buildings_developer_idx').on(t.developerOrgId),
    index('buildings_geog_gix').using('gist', t.geog),
  ]
)

export const units = snakeCase.table(
  'units',
  {
    baths: integer(),
    beds: integer(),
    buildingId: uuid()
      .notNull()
      .references(() => buildings.id, { onDelete: 'cascade' }),
    builtUpSqm: numeric({ precision: 12, scale: 2 }),
    createdAt: createdAtColumn(),
    deletedAt: deletedAtColumn(),
    floor: integer(),
    id: idColumn(),
    unitNumber: varchar({ length: 40 }).notNull(),
    updatedAt: updatedAtColumn(),
  },
  (t) => [
    unique('units_building_number').on(t.buildingId, t.unitNumber),
    index('units_building_idx').on(t.buildingId),
  ]
)

export const listingTypes = snakeCase.table(
  'listing_types',
  {
    category: listingCategoryEnum().notNull(),
    createdAt: createdAtColumn(),
    id: idColumn(),
    name: varchar({ length: 80 }).notNull(),
    slug: varchar({ length: 80 }).notNull().unique(),
    sortOrder: integer().notNull().default(0),
  },
  (t) => [index('listing_types_category_idx').on(t.category)]
)

export const amenities = snakeCase.table('amenities', {
  createdAt: createdAtColumn(),
  id: idColumn(),
  name: varchar({ length: 80 }).notNull(),
  slug: varchar({ length: 80 }).notNull().unique(),
  sortOrder: integer().notNull().default(0),
})

export const listings = snakeCase.table(
  'listings',
  {
    availableFrom: date({ mode: 'string' }),
    balconySqm: numeric({ precision: 12, scale: 2 }),
    baths: integer(),
    beds: integer(),
    buildingId: uuid().references(() => buildings.id, { onDelete: 'set null' }),
    builtUpSqm: numeric({ precision: 12, scale: 2 }),
    bumpedAt: timestamp({ mode: 'date', withTimezone: true }),
    category: listingCategoryEnum().notNull(),
    cheques: smallint(),
    cityId: uuid().references(() => cities.id, { onDelete: 'set null' }),
    communityId: uuid().references(() => communities.id, {
      onDelete: 'set null',
    }),
    completionStatus: completionStatusEnum().notNull().default('ready'),
    countryId: uuid()
      .notNull()
      .references(() => countries.id, { onDelete: 'restrict' }),
    createdAt: createdAtColumn(),
    currency: char({ length: 3 }).notNull(),
    deletedAt: deletedAtColumn(),
    divisionId: uuid().references(() => adminDivisions.id, {
      onDelete: 'set null',
    }),
    expiresAt: timestamp({ mode: 'date', withTimezone: true }),
    floor: integer(),
    formattedAddress: text(),
    furnishing: furnishingEnum(),
    geog: geographyPoint(),
    id: idColumn(),
    lat: doublePrecision(),
    leadCount: integer().notNull().default(0),
    listedByUserId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    lng: doublePrecision(),
    occupancy: occupancyEnum(),
    orgId: uuid()
      .notNull()
      .references(() => organizations.id, { onDelete: 'restrict' }),
    parkingSpaces: integer(),
    permitAuthority: varchar({ length: 120 }),
    permitExpiresAt: date({ mode: 'string' }),
    permitNumber: varchar({ length: 80 }),
    plotSqm: numeric({ precision: 12, scale: 2 }),
    priceAmount: numeric({ precision: 15, scale: 2 }).notNull(),
    pricePeriod: pricePeriodEnum().notNull(),
    projectId: uuid().references(() => projects.id, { onDelete: 'set null' }),
    publicRef: varchar({ length: 24 }).notNull().unique(),
    publishedAt: timestamp({ mode: 'date', withTimezone: true }),
    purpose: listingPurposeEnum().notNull(),
    quality: listingQualityEnum().notNull().default('standard'),
    regulatory: jsonb().$type<Record<string, unknown>>(),
    securityDeposit: numeric({ precision: 15, scale: 2 }),
    slug: varchar({ length: 180 }).notNull().unique(),
    status: listingStatusEnum().notNull().default('draft'),
    subCommunityId: uuid().references(() => subCommunities.id, {
      onDelete: 'set null',
    }),
    title: varchar({ length: 200 }).notNull(),
    totalFloors: integer(),
    typeId: uuid()
      .notNull()
      .references(() => listingTypes.id, { onDelete: 'restrict' }),
    unitId: uuid().references(() => units.id, { onDelete: 'set null' }),
    unitNumber: varchar({ length: 40 }),
    updatedAt: updatedAtColumn(),
    verification: verificationStatusEnum().notNull().default('unverified'),
    viewCount: integer().notNull().default(0),
    yearBuilt: integer(),
  },
  (t) => [
    index('listings_org_idx').on(t.orgId),
    index('listings_listed_by_idx').on(t.listedByUserId),
    index('listings_published_idx').on(t.publishedAt),
    index('listings_live_purpose_city_idx')
      .on(t.purpose, t.category, t.countryId, t.cityId)
      .where(sql`${t.deletedAt} is null and ${t.status} = 'live'`),
    index('listings_live_price_idx')
      .on(t.priceAmount, t.currency)
      .where(sql`${t.deletedAt} is null and ${t.status} = 'live'`),
    index('listings_live_beds_baths_idx')
      .on(t.beds, t.baths)
      .where(sql`${t.deletedAt} is null and ${t.status} = 'live'`),
    index('listings_geog_gix').using('gist', t.geog),
  ]
)

export const listingTranslations = snakeCase.table(
  'listing_translations',
  {
    createdAt: createdAtColumn(),
    description: text().notNull(),
    id: idColumn(),
    listingId: uuid()
      .notNull()
      .references(() => listings.id, { onDelete: 'cascade' }),
    locale: varchar({ length: 12 }).notNull(),
    title: varchar({ length: 200 }).notNull(),
    updatedAt: updatedAtColumn(),
  },
  (t) => [
    unique('listing_translations_listing_locale').on(t.listingId, t.locale),
  ]
)

export const listingAmenities = snakeCase.table(
  'listing_amenities',
  {
    amenityId: uuid()
      .notNull()
      .references(() => amenities.id, { onDelete: 'cascade' }),
    createdAt: createdAtColumn(),
    id: idColumn(),
    listingId: uuid()
      .notNull()
      .references(() => listings.id, { onDelete: 'cascade' }),
  },
  (t) => [
    unique('listing_amenities_listing_amenity').on(t.listingId, t.amenityId),
    index('listing_amenities_amenity_idx').on(t.amenityId),
  ]
)

export const listingMedia = snakeCase.table(
  'listing_media',
  {
    alt: varchar({ length: 200 }),
    createdAt: createdAtColumn(),
    height: integer(),
    id: idColumn(),
    isCover: boolean().notNull().default(false),
    kind: mediaKindEnum().notNull().default('photo'),
    listingId: uuid()
      .notNull()
      .references(() => listings.id, { onDelete: 'cascade' }),
    mime: varchar({ length: 80 }),
    sortOrder: integer().notNull().default(0),
    storageKey: varchar({ length: 400 }),
    updatedAt: updatedAtColumn(),
    url: text().notNull(),
    width: integer(),
  },
  (t) => [index('listing_media_listing_sort_idx').on(t.listingId, t.sortOrder)]
)

export const listingPriceHistory = snakeCase.table(
  'listing_price_history',
  {
    amount: numeric({ precision: 15, scale: 2 }).notNull(),
    createdAt: createdAtColumn(),
    currency: char({ length: 3 }).notNull(),
    id: idColumn(),
    listingId: uuid()
      .notNull()
      .references(() => listings.id, { onDelete: 'cascade' }),
    recordedAt: timestamp({ mode: 'date', withTimezone: true })
      .notNull()
      .defaultNow(),
    source: varchar({ length: 40 }),
  },
  (t) => [
    index('listing_price_history_listing_idx').on(t.listingId, t.recordedAt),
  ]
)

export const listingStatusEvents = snakeCase.table(
  'listing_status_events',
  {
    actorUserId: uuid().references(() => users.id, { onDelete: 'set null' }),
    createdAt: createdAtColumn(),
    fromStatus: listingStatusEnum(),
    id: idColumn(),
    listingId: uuid()
      .notNull()
      .references(() => listings.id, { onDelete: 'cascade' }),
    reason: text(),
    toStatus: listingStatusEnum().notNull(),
  },
  (t) => [
    index('listing_status_events_listing_idx').on(t.listingId, t.createdAt),
  ]
)
