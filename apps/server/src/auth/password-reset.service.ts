import { Injectable } from '@nestjs/common';
import { db, users, sessions, passwordResets } from '@lukes-projects/db';
import { and, eq, isNull, gt } from 'drizzle-orm';
import { normalizeEmail, newOpaqueToken, sha256Hex } from '@lukes-projects/shared';
import { hashPassword } from '@lukes-projects/auth';

const RESET_TTL_SEC = 60 * 60;

@Injectable()
export class PasswordResetService {
	/**
	 * Create a one-hour, single-use reset token for the email (if it exists).
	 * Always returns { ok: true }. In dev, also returns { devToken }.
	 */
	async request(email: string, ip?: string, userAgent?: string) {
		const e = normalizeEmail(email);
		const u = await db.query.users.findFirst({ where: eq(users.email, e) });

		// avoid enumeration: behave the same if user not found
		if (!u) return { ok: true } as const;

		// invalidate any previous unused tokens for user
		await db
			.update(passwordResets)
			.set({ usedAt: new Date() })
			.where(and(eq(passwordResets.userId, u.id), isNull(passwordResets.usedAt)));

		const token = newOpaqueToken();
		const tokenHash = sha256Hex(token);
		const expiresAt = new Date(Date.now() + RESET_TTL_SEC * 1000);

		await db.insert(passwordResets).values({
			id: crypto.randomUUID(),
			userId: u.id,
			tokenHash,
			expiresAt,
			ip,
			userAgent
		});

		// dev sends token instead of email
		const dev = process.env.NODE_ENV !== 'production' ? { devToken: token } : {};
		return { ok: true, ...dev } as const;
	}

	/**
	 * Consume token and set a new password. Always returns { ok: true }.
	 * If token is invalid/expired/used, nothing happens (non-enumerating UX).
	 */
	async reset(token: string, newPassword: string) {
		const tokenHash = sha256Hex(token);

		const [row] = await db
			.select({
				id: passwordResets.id,
				userId: passwordResets.userId,
				expiresAt: passwordResets.expiresAt,
				usedAt: passwordResets.usedAt
			})
			.from(passwordResets)
			.where(and(eq(passwordResets.tokenHash, tokenHash), gt(passwordResets.expiresAt, new Date())))
			.limit(1);

		// token missing/expired or already used, do nothing return ok
		if (!row || row.usedAt) return { ok: true } as const;

		// update
		const passwordHash = await hashPassword(newPassword);
		await db.update(users).set({ passwordHash }).where(eq(users.id, row.userId));

		// mark token used
		await db.update(passwordResets).set({ usedAt: new Date() }).where(eq(passwordResets.id, row.id));

		// revoke all existing sessions for safety
		await db.update(sessions).set({ revokedAt: new Date() }).where(eq(sessions.userId, row.userId));

		return { ok: true } as const;
	}
}
