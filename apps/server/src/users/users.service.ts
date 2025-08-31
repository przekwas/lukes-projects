import { Injectable } from '@nestjs/common';
import { db, users, memberships, roles, apps } from '@lukes-projects/db';
import { newId, normalizeEmail } from '@lukes-projects/shared';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
	findByEmail(email: string) {
		return db.query.users.findFirst({ where: eq(users.email, normalizeEmail(email)) });
	}

	async createUser(email: string, passwordHash: string, displayName: string) {
		const [u] = await db
			.insert(users)
			.values({ id: newId(), email: normalizeEmail(email), passwordHash, displayName })
			.returning();
		return u;
	}

	async ensureMembership(
		userId: string,
		appKey: string,
		roleCode: 'owner' | 'admin' | 'member' | 'viewer' = 'member'
	) {
		const app = await db.query.apps.findFirst({ where: eq(apps.key, appKey) });
		if (!app) return null;

		const role = await db.query.roles.findFirst({ where: and(eq(roles.appId, app.id), eq(roles.code, roleCode)) });
		if (!role) return null;

		await db
			.insert(memberships)
			.values({ userId, appId: app.id, roleId: role.id })
			.onConflictDoUpdate({
				target: [memberships.userId, memberships.appId],
				set: { roleId: role.id }
			});

		return { appId: app.id, roleId: role.id };
	}
}
