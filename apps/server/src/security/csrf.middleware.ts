import { Injectable, NestMiddleware } from '@nestjs/common';
import { CSRF_COOKIE, parseOriginList, isAllowedOrigin } from '@lukes-projects/shared';
import type { IncomingMessage, ServerResponse } from 'http';

const SAFE = new Set(['GET', 'HEAD', 'OPTIONS']);
const ALLOW = parseOriginList(process.env.CORS_ORIGINS);

type Req = IncomingMessage & {
	cookies?: Record<string, string>;
	headers: IncomingMessage['headers'] & {
		'x-csrf-token'?: string | string[];
		'csrf-token'?: string | string[];
	};
	method?: string;
	url?: string;
};

function hv(h?: string | string[]) {
	return Array.isArray(h) ? h[0] : h;
}

function send(res: ServerResponse, status: number, msg: string) {
	res.statusCode = status;
	res.setHeader('content-type', 'application/json; charset=utf-8');
	res.end(JSON.stringify({ ok: false, error: msg }));
}

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
	use(req: Req, res: ServerResponse, next: (err?: any) => void) {
		const method = (req.method || 'GET').toUpperCase();
		if (SAFE.has(method)) return next();

		const origin = hv(req.headers.origin) ?? hv(req.headers.referer);
		if (!isAllowedOrigin(origin, ALLOW)) {
			return send(res, 403, 'Origin not allowed');
		}

		const cookieHeader = hv(req.headers.cookie);
		const cookieToken =
			req.cookies?.[CSRF_COOKIE] ??
			cookieHeader?.match(new RegExp(`(?:^|;\\s*)${CSRF_COOKIE}=([^;]+)`, 'i'))?.[1];

		const headerToken = hv(req.headers['x-csrf-token']) ?? hv(req.headers['csrf-token']);

		if (!cookieToken || !headerToken || cookieToken !== headerToken) {
			return send(res, 403, 'CSRF token missing or invalid');
		}

		next();
	}
}
