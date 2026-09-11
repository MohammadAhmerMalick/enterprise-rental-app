import { timestamp, uuid } from 'drizzle-orm/pg-core'

export const idColumn = () => uuid().primaryKey().defaultRandom()

export const createdAtColumn = () =>
  timestamp({ mode: 'date', withTimezone: true }).notNull().defaultNow()

export const updatedAtColumn = () =>
  timestamp({ mode: 'date', withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())

export const deletedAtColumn = () =>
  timestamp({ mode: 'date', withTimezone: true })
