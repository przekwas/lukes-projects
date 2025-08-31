import { Injectable } from '@nestjs/common';
import { db } from '@lukes-projects/db';
import { sessions, users } from '@lukes-projects/db';
import { newId, SEVEN_DAYS } from '@lukes-projects/shared';
import { and, eq, isNull, gt } from 'drizzle-orm';
import crypto from 'node:crypto';

function base64url(buf: Buffer) {
	return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function sha256(str: string) {
	return crypto.createHash('sha256').update(str, 'utf8').digest('hex');
}

@Injectable()
export class SessionsService {
	async create(userId: string, ip?: string, userAgent?: string, maxAgeSec = SEVEN_DAYS) {
		const token = base64url(crypto.randomBytes(32));
		const tokenHash = sha256(token);
		const expiresAt = new Date(Date.now() + maxAgeSec * 1000);

		await db.insert(sessions).values({ id: newId(), userId, tokenHash, ip, userAgent, expiresAt });
		return { token, expiresAt };
	}

	async getUserByToken(token: string) {
		const tokenHash = sha256(token);
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
		const tokenHash = sha256(token);
		await db.update(sessions).set({ revokedAt: new Date() }).where(eq(sessions.tokenHash, tokenHash));
	}
}
