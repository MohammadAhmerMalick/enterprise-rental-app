import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { getDbConnectionString } from '@/db/helper.js'
import { relations } from '@/db/schema/relations.js'

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error('DATABASE_URL is required')
}

export const pool = new Pool({ connectionString: getDbConnectionString() })

const pgdb = drizzle({
  client: pool,
  relations,
})

export default pgdb
