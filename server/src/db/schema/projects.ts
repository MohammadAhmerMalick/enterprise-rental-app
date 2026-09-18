import {
  date,
  index,
  integer,
  jsonb,
  numeric,
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
import { projectStatusEnum } from '@/db/schema/enums.js'
import {
  cities,
  communities,
  countries,
  geographyPoint,
} from '@/db/schema/geography.js'
import { organizations } from '@/db/schema/identity.js'

export const projects = snakeCase.table(
  'projects',
  {
    cityId: uuid().references(() => cities.id, { onDelete: 'set null' }),
    communityId: uuid().references(() => communities.id, {
      onDelete: 'set null',
    }),
    countryId: uuid()
      .notNull()
      .references(() => countries.id, { onDelete: 'restrict' }),
    createdAt: createdAtColumn(),
    deletedAt: deletedAtColumn(),
    description: text(),
    developerOrgId: uuid()
      .notNull()
      .references(() => organizations.id, { onDelete: 'restrict' }),
    geog: geographyPoint(),
    handoverAt: date({ mode: 'string' }),
    id: idColumn(),
    name: varchar({ length: 200 }).notNull(),
    paymentPlan: jsonb().$type<Record<string, unknown>>(),
    slug: varchar({ length: 160 }).notNull(),
    status: projectStatusEnum().notNull().default('announced'),
    updatedAt: updatedAtColumn(),
  },
  (t) => [
    unique('projects_developer_slug').on(t.developerOrgId, t.slug),
    index('projects_city_idx').on(t.cityId),
    index('projects_developer_idx').on(t.developerOrgId),
    index('projects_geog_gix').using('gist', t.geog),
  ]
)

export const projectUnitTypes = snakeCase.table(
  'project_unit_types',
  {
    bathrooms: integer(),
    bedrooms: integer(),
    builtUpSqmMax: numeric({ precision: 12, scale: 2 }),
    builtUpSqmMin: numeric({ precision: 12, scale: 2 }),
    createdAt: createdAtColumn(),
    currency: varchar({ length: 3 }).notNull().default('AED'),
    id: idColumn(),
    name: varchar({ length: 80 }).notNull(),
    priceMax: numeric({ precision: 15, scale: 2 }),
    priceMin: numeric({ precision: 15, scale: 2 }),
    projectId: uuid()
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    unitCount: integer(),
    updatedAt: updatedAtColumn(),
  },
  (t) => [index('project_unit_types_project_idx').on(t.projectId)]
)
