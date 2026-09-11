import { defineConfig } from 'drizzle-kit'
import { getDbConnectionString } from './src/db/helper'

export default defineConfig({
  dbCredentials: { url: getDbConnectionString() },
  dialect: 'postgresql',
  extensionsFilters: ['postgis'],
  out: './drizzle',
  schema: './src/db/schema/index.ts',
})
