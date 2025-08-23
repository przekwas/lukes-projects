import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const poke = pgTable('poke', {
	id: serial('id').primaryKey(),
	msg: text('msg').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});
