import { sql } from 'drizzle-orm'
import {
  char,
  customType,
  doublePrecision,
  index,
  snakeCase,
  text,
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
import { geoAliasTargetEnum, measurementSystemEnum } from '@/db/schema/enums.js'

export const geographyPoint = customType<{
  data: string
  driverData: string
}>({
  dataType() {
    return 'geography(Point,4326)'
  },
})

export const countries = snakeCase.table(
  'countries',
  {
    createdAt: createdAtColumn(),
    currency: char({ length: 3 }).notNull(),
    deletedAt: deletedAtColumn(),
    geog: geographyPoint(),
    id: idColumn(),
    iso2: char({ length: 2 }).notNull().unique(),
    iso3: char({ length: 3 }).notNull().unique(),
    lat: doublePrecision(),
    lng: doublePrecision(),
    measurementSystem: measurementSystemEnum().notNull().default('metric'),
    name: varchar({ length: 120 }).notNull(),
    phoneCode: varchar({ length: 8 }).notNull(),
    slug: varchar({ length: 120 }).notNull().unique(),
    updatedAt: updatedAtColumn(),
  },
  (t) => [index('countries_geog_gix').using('gist', t.geog)]
)

export const adminDivisions = snakeCase.table(
  'admin_divisions',
  {
    countryId: uuid()
      .notNull()
      .references(() => countries.id, { onDelete: 'restrict' }),
    createdAt: createdAtColumn(),
    deletedAt: deletedAtColumn(),
    geog: geographyPoint(),
    id: idColumn(),
    lat: doublePrecision(),
    lng: doublePrecision(),
    name: varchar({ length: 160 }).notNull(),
    slug: varchar({ length: 160 }).notNull(),
    type: varchar({ length: 40 }).notNull().default('state'),
    updatedAt: updatedAtColumn(),
  },
  (t) => [
    unique('admin_divisions_country_slug').on(t.countryId, t.slug),
    index('admin_divisions_country_idx').on(t.countryId),
    index('admin_divisions_geog_gix').using('gist', t.geog),
  ]
)

export const cities = snakeCase.table(
  'cities',
  {
    countryId: uuid()
      .notNull()
      .references(() => countries.id, { onDelete: 'restrict' }),
    createdAt: createdAtColumn(),
    deletedAt: deletedAtColumn(),
    divisionId: uuid().references(() => adminDivisions.id, {
      onDelete: 'set null',
    }),
    geog: geographyPoint(),
    id: idColumn(),
    lat: doublePrecision(),
    lng: doublePrecision(),
    name: varchar({ length: 160 }).notNull(),
    slug: varchar({ length: 160 }).notNull(),
    updatedAt: updatedAtColumn(),
  },
  (t) => [
    unique('cities_country_slug').on(t.countryId, t.slug),
    index('cities_country_idx').on(t.countryId),
    index('cities_division_idx').on(t.divisionId),
    index('cities_geog_gix').using('gist', t.geog),
  ]
)

export const communities = snakeCase.table(
  'communities',
  {
    cityId: uuid()
      .notNull()
      .references(() => cities.id, { onDelete: 'restrict' }),
    createdAt: createdAtColumn(),
    deletedAt: deletedAtColumn(),
    description: text(),
    geog: geographyPoint(),
    id: idColumn(),
    lat: doublePrecision(),
    lng: doublePrecision(),
    name: varchar({ length: 160 }).notNull(),
    slug: varchar({ length: 160 }).notNull(),
    updatedAt: updatedAtColumn(),
  },
  (t) => [
    unique('communities_city_slug').on(t.cityId, t.slug),
    index('communities_city_idx').on(t.cityId),
    index('communities_geog_gix').using('gist', t.geog),
  ]
)

export const subCommunities = snakeCase.table(
  'sub_communities',
  {
    communityId: uuid()
      .notNull()
      .references(() => communities.id, { onDelete: 'restrict' }),
    createdAt: createdAtColumn(),
    deletedAt: deletedAtColumn(),
    geog: geographyPoint(),
    id: idColumn(),
    lat: doublePrecision(),
    lng: doublePrecision(),
    name: varchar({ length: 160 }).notNull(),
    slug: varchar({ length: 160 }).notNull(),
    updatedAt: updatedAtColumn(),
  },
  (t) => [
    unique('sub_communities_community_slug').on(t.communityId, t.slug),
    index('sub_communities_community_idx').on(t.communityId),
    index('sub_communities_geog_gix').using('gist', t.geog),
  ]
)

export const geoAliases = snakeCase.table(
  'geo_aliases',
  {
    alias: varchar({ length: 160 }).notNull(),
    createdAt: createdAtColumn(),
    id: idColumn(),
    locale: varchar({ length: 12 }),
    targetId: uuid().notNull(),
    targetType: geoAliasTargetEnum().notNull(),
  },
  (t) => [
    unique('geo_aliases_alias_locale_target').on(
      t.alias,
      t.locale,
      t.targetType
    ),
    index('geo_aliases_target_idx').on(t.targetType, t.targetId),
    index('geo_aliases_alias_lower_idx').on(sql`lower(${t.alias})`),
  ]
)
