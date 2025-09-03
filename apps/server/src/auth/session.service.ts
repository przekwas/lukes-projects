import { Injectable } from '@nestjs/common';
import { db, sessions, users } from '@lukes-projects/db';
import { newId, SEVEN_DAYS, base64url, sha256Hex } from '@lukes-projects/shared';
import { and, eq, isNull, gt } from 'drizzle-orm';
import crypto from 'node:crypto';

@Injectable()
export class SessionsService {
	async create(userId: string, ip?: string, userAgent?: string, maxAgeSec = SEVEN_DAYS) {
		const token = base64url(crypto.randomBytes(32));
		const tokenHash = sha256Hex(token);
		const expiresAt = new Date(Date.now() + maxAgeSec * 1000);

		await db.insert(sessions).values({ id: newId(), userId, tokenHash, ip, userAgent, expiresAt });
		return { token, expiresAt };
	}

	async getUserByToken(token: string) {
		const tokenHash = sha256Hex(token);
		const [row] = await db
			.select({ id: users.id, email: users.email, displayName: users.displayName })
			.from(sessions)
			.innerJoin(users, eq(sessions.userId, users.id))
			.where(
				and(eq(sessions.tokenHash, tokenHash), isNull(sessions.revokedAt), gt(sessions.expiresAt, new Date()))
			)
			.limit(1);
		return row ?? null;
	}

	async revoke(token: string) {
		const tokenHash = sha256Hex(token);
		await db.update(sessions).set({ revokedAt: new Date() }).where(eq(sessions.tokenHash, tokenHash));
	}
}
