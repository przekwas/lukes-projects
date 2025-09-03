import { CSRF_COOKIE, SEVEN_DAYS } from './utilities.js';
import type { FastifyReply } from 'fastify';

type Common = { crossSite?: boolean; secure?: boolean; maxAgeSec?: number };

function norm(o?: Common) {
	return {
		crossSite: o?.crossSite ?? false,
		secure: o?.secure ?? false,
		maxAgeSec: o?.maxAgeSec ?? SEVEN_DAYS
	};
}

export function setCookie(reply: FastifyReply, name: string, value: string, opts?: Common & { httpOnly?: boolean }) {
	const { crossSite, secure, maxAgeSec } = norm(opts);
	reply.setCookie(name, value, {
		path: '/',
		httpOnly: opts?.httpOnly ?? true,
		sameSite: crossSite ? 'none' : 'lax',
		secure,
		maxAge: maxAgeSec
	});
}

export function clearCookie(reply: FastifyReply, name: string, crossSite?: boolean, secure?: boolean) {
	reply.clearCookie(name, {
		path: '/',
		sameSite: crossSite ? 'none' : 'lax',
		secure
	});
}

export function setSessionCookie(reply: FastifyReply, token: string, opts?: { name?: string } & Common) {
	const name = opts?.name ?? 'auth';
	const { crossSite, secure, maxAgeSec } = norm(opts);
	reply.setCookie(name, token, {
		path: '/',
		httpOnly: true,
		sameSite: crossSite ? 'none' : 'lax',
		secure,
		maxAge: maxAgeSec
	});
}

export function setCsrfCookie(reply: FastifyReply, token: string, opts?: Common) {
	const { crossSite, secure, maxAgeSec } = norm(opts);
	reply.setCookie(CSRF_COOKIE, token, {
		path: '/',
		httpOnly: false, // readable by client to echo in header
		sameSite: crossSite ? 'none' : 'lax',
		secure,
		maxAge: maxAgeSec
	});
}
