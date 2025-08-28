import { Injectable, NestMiddleware } from '@nestjs/common';
import type { FastifyRequest, FastifyReply } from 'fastify';

const SAFE = new Set(['GET', 'HEAD', 'OPTIONS']);
const allowList = (process.env.CORS_ORIGINS ?? '')
	.split(',')
	.map(s => s.trim().toLowerCase())
	.filter(Boolean);

function isAllowedOrigin(url?: string) {
	if (!url || !allowList.length) return true; // dev permissive

	try {
		const u = new URL(url);
		const origin = `${u.protocol}//${u.host}`.toLowerCase();
		return allowList.includes(origin);
	} catch {
		return false;
	}
}

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
	use(req: FastifyRequest, res: FastifyReply, next: (err?: any) => void) {
		const method = (req.method || 'GET').toUpperCase();
		if (SAFE.has(method)) return next();

		// origin-referer allow list
		const origin = (req.headers['origin'] as string | undefined) ?? (req.headers['referer'] as string | undefined);
		if (!isAllowedOrigin(origin)) {
			res.code(403).send({ ok: false, error: 'Origin not allowed' });
			return;
		}

		// double submit token check
		const cookieToken = req.cookies?.csrf as string | undefined;
		const headerToken =
			(req.headers['x-csrf-token'] as string | undefined) || (req.headers['csrf-token'] as string | undefined);

		if (!cookieToken || !headerToken || cookieToken !== headerToken) {
			res.code(403).send({ ok: false, error: 'CSRF token missing or invalid' });
			return;
		}

		next();
	}
}
