import { Injectable } from '@nestjs/common';
import { db, sessions, users, roles, apps, memberships } from '@lukes-projects/db';
import { newId, SEVEN_DAYS, newOpaqueToken, sha256Hex } from '@lukes-projects/shared';
import { and, eq, isNull, gt } from 'drizzle-orm';

@Injectable()
export class SessionsService {
	async create(userId: string, ip?: string, userAgent?: string, maxAgeSec = SEVEN_DAYS) {
		const token = newOpaqueToken();
		const tokenHash = sha256Hex(token);
		const expiresAt = new Date(Date.now() + maxAgeSec * 1000);

		await db.insert(sessions).values({ id: newId(), userId, tokenHash, ip, userAgent, expiresAt });
		return { token, expiresAt };
	}

	async getUserByToken(token: string) {
		const tokenHash = sha256Hex(token);

		// base user
		const [u] = await db
			.select({ id: users.id, email: users.email, displayName: users.displayName, isActive: users.isActive })
			.from(sessions)
			.innerJoin(users, eq(sessions.userId, users.id))
			.where(
				and(eq(sessions.tokenHash, tokenHash), isNull(sessions.revokedAt), gt(sessions.expiresAt, new Date()))
			)
			.limit(1);

		if (!u || !u.isActive) return null;

		// get role rows
		const rows = await db
			.select({
				appKey: apps.key,
				code: roles.code,
				level: roles.level
			})
			.from(memberships)
			.innerJoin(roles, eq(memberships.roleId, roles.id))
			.innerJoin(apps, eq(memberships.appId, apps.id))
			.where(eq(memberships.userId, u.id));

		return {
			id: u.id,
			email: u.email,
			displayName: u.displayName ?? null,
			appRoles: rows.map(r => ({ appKey: r.appKey, code: r.code, level: r.level }))
		};
	}

	async revoke(token: string) {
		const tokenHash = sha256Hex(token);
		await db.update(sessions).set({ revokedAt: new Date() }).where(eq(sessions.tokenHash, tokenHash));
	}
}
