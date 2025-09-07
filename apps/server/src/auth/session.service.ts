import { Injectable } from '@nestjs/common';
import { db, sessions, users, roles, apps, memberships } from '@lukes-projects/db';
import { newId, THIRTY_DAYS, newOpaqueToken, sha256Hex } from '@lukes-projects/shared';
import { and, eq, isNull, gt } from 'drizzle-orm';

@Injectable()
export class SessionsService {
	/**
	 * Create a new opaque session token.
	 * Default TTL = 30 days (fixed, non-sliding).
	 */
	async create(userId: string, ip?: string, userAgent?: string, maxAgeSec = THIRTY_DAYS) {
		const token = newOpaqueToken();
		const tokenHash = sha256Hex(token);
		const expiresAt = new Date(Date.now() + maxAgeSec * 1000);

		await db.insert(sessions).values({ id: newId(), userId, tokenHash, ip, userAgent, expiresAt });
		return { token, expiresAt };
	}

	/**
	 * Validate a token and load its owning user (no roles).
	 * Returns null if expired/revoked/invalid OR user is inactive.
	 */
	async findSessionByToken(token: string) {
		const tokenHash = sha256Hex(token);
		const [row] = await db
			.select({
				sessionId: sessions.id,
				createdAt: sessions.createdAt,
				expiresAt: sessions.expiresAt,
				userId: users.id,
				email: users.email,
				displayName: users.displayName,
				isActive: users.isActive
			})
			.from(sessions)
			.innerJoin(users, eq(sessions.userId, users.id))
			.where(
				and(eq(sessions.tokenHash, tokenHash), isNull(sessions.revokedAt), gt(sessions.expiresAt, new Date()))
			)
			.limit(1);

		if (!row || !row.isActive) return null;
		return row;
	}

	/**
	 * Resolve the user object used by req.user (includes roles for /auth/me).
	 */
	async getUserByToken(token: string) {
		const s = await this.findSessionByToken(token);
		if (!s) return null;

		const rows = await db
			.select({ appKey: apps.key, code: roles.code, level: roles.level })
			.from(memberships)
			.innerJoin(roles, eq(memberships.roleId, roles.id))
			.innerJoin(apps, eq(memberships.appId, apps.id))
			.where(eq(memberships.userId, s.userId));

		return {
			id: s.userId,
			email: s.email,
			displayName: s.displayName ?? null,
			appRoles: rows.map(r => ({ appKey: r.appKey, code: r.code, level: r.level }))
		};
	}

	/**
	 * Manual rotation (if you ever call it):
	 * - keepExpiry=true => fixed expiry (default; recommended)
	 * - keepExpiry=false => sliding expiry (extend lifetime)
	 */
	async rotate(token: string, opts: { keepExpiry?: boolean; maxAgeSec?: number } = {}) {
		const cur = await this.findSessionByToken(token);
		if (!cur) return null;

		const nextToken = newOpaqueToken();
		const nextHash = sha256Hex(nextToken);

		const expiresAt =
			opts.keepExpiry !== false ? cur.expiresAt : new Date(Date.now() + (opts.maxAgeSec ?? THIRTY_DAYS) * 1000);

		await db.update(sessions).set({ revokedAt: new Date() }).where(eq(sessions.id, cur.sessionId));
		await db.insert(sessions).values({ id: newId(), userId: cur.userId, tokenHash: nextHash, expiresAt });

		return { token: nextToken, expiresAt };
	}

	async revoke(token: string) {
		const tokenHash = sha256Hex(token);
		await db.update(sessions).set({ revokedAt: new Date() }).where(eq(sessions.tokenHash, tokenHash));
	}

	async revokeAllForUser(userId: string) {
		await db.update(sessions).set({ revokedAt: new Date() }).where(eq(sessions.userId, userId));
	}

	async listForUser(userId: string) {
		return db
			.select({
				id: sessions.id,
				createdAt: sessions.createdAt,
				expiresAt: sessions.expiresAt,
				revokedAt: sessions.revokedAt,
				ip: sessions.ip,
				userAgent: sessions.userAgent
			})
			.from(sessions)
			.where(eq(sessions.userId, userId));
	}

	async revokeById(userId: string, sessionId: string) {
		await db
			.update(sessions)
			.set({ revokedAt: new Date() })
			.where(and(eq(sessions.id, sessionId), eq(sessions.userId, userId)));
	}
}
