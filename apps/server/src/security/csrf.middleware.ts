import { Injectable, NestMiddleware } from '@nestjs/common';
import { CSRF_COOKIE } from '@lukes-projects/shared';
import type { IncomingMessage, ServerResponse } from 'http';

const SAFE = new Set(['GET', 'HEAD', 'OPTIONS']);

// cache/normalize the allowlist once
const ALLOWLIST = new Set(
	(process.env.CORS_ORIGINS ?? '')
		.split(',')
		.map(s => s.trim().toLowerCase())
		.filter(Boolean)
);

type Req = IncomingMessage & {
	cookies?: Record<string, string>; // present if fastify-cookie decorated the request
	headers: IncomingMessage['headers'] & {
		'x-csrf-token'?: string | string[];
		'csrf-token'?: string | string[];
	};
	method?: string;
	url?: string;
};

type Res = ServerResponse & {
	statusCode: number;
};

function isAllowedOrigin(url?: string): boolean {
	// dev-permissive if no allowlist configured
	if (!ALLOWLIST.size || !url) return true;
	try {
		const u = new URL(url);
		const origin = `${u.protocol}//${u.host}`.toLowerCase();
		return ALLOWLIST.has(origin);
	} catch {
		return false;
	}
}

function send403(res: Res, message: string) {
	res.statusCode = 403;
	res.setHeader('content-type', 'application/json; charset=utf-8');
	res.end(JSON.stringify({ ok: false, error: message }));
}

function readCsrfFromCookieHeader(h?: string): string | undefined {
	if (!h) return undefined;
	// match "csrf=<value>" anywhere in the cookie string
	const m = h.match(new RegExp(`(?:^|;\\s*)${CSRF_COOKIE}=([^;]+)`, 'i'));
	return m?.[1];
}

function headerValue(h?: string | string[]): string | undefined {
	if (!h) return undefined;
	return Array.isArray(h) ? h[0] : h;
}

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
	use(req: Req, res: Res, next: (err?: any) => void) {
		const method = (req.method || 'GET').toUpperCase();
		if (SAFE.has(method)) return next();

		// origin/referer allowlist for samesite=none
		const origin = headerValue(req.headers.origin) ?? headerValue(req.headers.referer);
		if (!isAllowedOrigin(origin)) {
			return send403(res, 'Origin not allowed');
		}

		// double submit token, cookie value must match header value
		const cookieToken = req.cookies?.csrf ?? readCsrfFromCookieHeader(headerValue(req.headers.cookie));
		const headerToken = headerValue(req.headers['x-csrf-token']) ?? headerValue(req.headers['csrf-token']);

		if (!cookieToken || !headerToken || cookieToken !== headerToken) {
			return send403(res, 'CSRF token missing or invalid');
		}

		next();
	}
}
