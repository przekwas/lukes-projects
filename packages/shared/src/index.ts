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
	if (typeof token !== 'string') return false;
	// 32 bytes base64url often 43 or 44 chars
	const base64urlLenOk = token.length >= 43;
	const hex64 = /^[0-9a-f]{64}$/i.test(token);
	return base64urlLenOk || hex64;
}

// Compute an expiry Date from now (seconds)
export function expiryIn(seconds: number): Date {
	return new Date(Date.now() + seconds * 1000);
}

// 7d helper commonly used for sessions
export const SEVEN_DAYS = 60 * 60 * 24 * 7;

export const CSRF_COOKIE = 'csrf';

// cookie setter
export function setSessionCookie(
	reply: { setCookie: (name: string, value: string, opts: Record<string, any>) => void },
	token: string,
	opts?: { name?: string; crossSite?: boolean; maxAgeSec?: number; secure?: boolean }
) {
	const name = opts?.name ?? 'auth';
	const crossSite = opts?.crossSite ?? false;
	const maxAge = opts?.maxAgeSec ?? SEVEN_DAYS;
	const secure = opts?.secure ?? crossSite; // prod can override via opts.secure

	reply.setCookie(name, token, {
		httpOnly: true,
		sameSite: crossSite ? 'none' : 'lax',
		secure,
		path: '/',
		maxAge
	});
}
