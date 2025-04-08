import { integer, pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core"

export const urls = pgTable('urls', {
    id: serial('id').primaryKey(),
    originalUrl: varchar('originalUrl').notNull(),
    shortenedUrl: varchar('shortenedUrl').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    visits: integer('visits').default(0)
})