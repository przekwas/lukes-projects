import {
	pgTable,
	serial,
	text,
	varchar,
	timestamp,
	boolean,
	integer,
	uniqueIndex,
	index,
	primaryKey
} from 'drizzle-orm/pg-core';

// TEMP table for testing
export const poke = pgTable('poke', {
	id: serial('id').primaryKey(),
	msg: text('msg').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	displayName: varchar('display_name', { length: 120 }).notNull(),
	isActive: boolean('is_active').notNull().default(true),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const apps = pgTable('apps', {
	id: serial('id').primaryKey(),
	key: varchar('key', { length: 64 }).notNull().unique(),
	name: varchar('name', { length: 120 }).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const roles = pgTable(
	'roles',
	{
		id: serial('id').primaryKey(),
		appId: integer('app_id')
			.notNull()
			.references(() => apps.id, { onDelete: 'cascade' }),
		code: varchar('code', { length: 64 }).notNull(),
		level: integer('level').notNull(),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
	},
	t => [uniqueIndex('roles_app_code_idx').on(t.appId, t.code)]
);

export const userRoles = pgTable('user_roles', {
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	roleId: integer('role_id')
		.notNull()
		.references(() => roles.id, { onDelete: 'cascade' })
});

export const memberships = pgTable(
	'memberships',
	{
		userId: integer('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		appId: integer('app_id')
			.notNull()
			.references(() => apps.id, { onDelete: 'cascade' }),
		roleId: integer('role_id')
			.notNull()
			.references(() => roles.id, { onDelete: 'restrict' }),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
	},
	t => [primaryKey({ columns: [t.userId, t.appId] })]
);

export const sessions = pgTable(
	'sessions',
	{
		token: text('token').primaryKey(),
		userId: integer('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		revoked: boolean('revoked').notNull().default(false),
		ip: varchar('ip', { length: 64 }),
		userAgent: varchar('user_agent', { length: 256 }),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
		expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
		revokedAt: timestamp('revoked_at', { withTimezone: true })
	},
	t => [index('sessions_user_idx').on(t.userId)]
);
