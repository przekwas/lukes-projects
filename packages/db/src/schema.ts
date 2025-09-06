// packages/db/src/schema.ts
import {
	pgTable,
	uuid,
	text,
	varchar,
	timestamp,
	boolean,
	integer,
	uniqueIndex,
	index,
	primaryKey
} from 'drizzle-orm/pg-core';

// ---------- sample test table ----------
export const poke = pgTable('poke', {
	id: uuid('id').primaryKey(),
	msg: text('msg').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

// ---------- core auth ----------
export const users = pgTable(
	'users',
	{
		id: uuid('id').primaryKey(),
		email: varchar('email', { length: 255 }).notNull(),
		passwordHash: text('password_hash').notNull(),
		displayName: varchar('display_name', { length: 120 }).notNull(),
		isActive: boolean('is_active').notNull().default(true),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
	},
	t => [uniqueIndex('users_email_unique_idx').on(t.email)]
);

export const apps = pgTable('apps', {
	id: uuid('id').primaryKey(),
	key: varchar('key', { length: 64 }).notNull().unique(),
	name: varchar('name', { length: 120 }).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const roles = pgTable(
	'roles',
	{
		id: uuid('id').primaryKey(),
		appId: uuid('app_id')
			.notNull()
			.references(() => apps.id, { onDelete: 'cascade' }),
		code: varchar('code', { length: 32 }).notNull(), // 'owner' | 'admin' | 'member' | 'viewer' (TS type in code)
		level: integer('level').notNull(),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
	},
	t => [
		// prevent duplicate role codes per app
		uniqueIndex('roles_app_code_idx').on(t.appId, t.code)
	]
);

export const memberships = pgTable(
	'memberships',
	{
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		appId: uuid('app_id')
			.notNull()
			.references(() => apps.id, { onDelete: 'cascade' }),
		roleId: uuid('role_id')
			.notNull()
			.references(() => roles.id, { onDelete: 'restrict' }),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
	},
	t => ({
		pk: primaryKey({ columns: [t.userId, t.appId] }),
		byUserIdx: index('memberships_user_idx').on(t.userId),
		byAppIdx: index('memberships_app_idx').on(t.appId)
	})
);

export const sessions = pgTable(
	'sessions',
	{
		id: uuid('id').primaryKey(),
		tokenHash: varchar('token_hash', { length: 64 }).notNull().unique(),
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		ip: varchar('ip', { length: 64 }),
		userAgent: varchar('user_agent', { length: 256 }),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
		expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
		revokedAt: timestamp('revoked_at', { withTimezone: true })
	},
	t => [index('sessions_user_idx').on(t.userId)]
);
