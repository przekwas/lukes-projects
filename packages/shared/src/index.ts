import { randomUUID, randomBytes } from 'crypto';

// Stable way to create UUIDs app-side
export function newId(): string {
	return randomUUID();
}

// Normalize emails consistently before storing/querying
export function normalizeEmail(email: string): string {
	return email.trim().toLowerCase();
}

// Opaque session token (default 32 bytes => 64-hex, matches DB CHECK >= 64)
export function newSessionToken(bytes = 32): string {
	return randomBytes(bytes).toString('hex');
}

// Simple guard that mirrors the DB token length check
export function isTokenValid(token: string): boolean {
	return typeof token === 'string' && token.length >= 64;
}

// Compute an expiry Date from now (seconds)
export function expiryIn(seconds: number): Date {
	return new Date(Date.now() + seconds * 1000);
}

// 7d helper commonly used for sessions
export const SEVEN_DAYS = 60 * 60 * 24 * 7;

// cookie setter
export function setSessionCookie(
	reply: { setCookie: (name: string, value: string, opts: Record<string, any>) => void },
	token: string,
	opts?: { crossSite?: boolean; maxAgeSec?: number }
) {
	const crossSite = opts?.crossSite ?? false;
	const maxAge = opts?.maxAgeSec ?? SEVEN_DAYS;

	reply.setCookie('session', token, {
		httpOnly: true,
		sameSite: crossSite ? 'none' : 'lax',
		secure: crossSite,
		path: '/',
		maxAge
	});
}
