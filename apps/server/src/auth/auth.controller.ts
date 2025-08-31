import { UseGuards, Body, Controller, Inject, Post, Res, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './register.dto.js';
import { LoginDto } from './login.dto.js';
import { SessionsService } from './session.service.js';
import { SessionGuard } from './session.guard.js';
import { COOKIE } from '@lukes-projects/auth';
import { setSessionCookie, CSRF_COOKIE } from '@lukes-projects/shared';
import type { FastifyReply } from 'fastify';
import { isProd } from '@lukes-projects/config';
import crypto from 'node:crypto';

const COOKIE_NAME = COOKIE.auth;
const crossSite = (process.env.CROSS_SITE_COOKIES ?? 'false').toLowerCase() === 'true';

function base64url(buf: Buffer) {
	return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(AuthService) private readonly auth: AuthService,
		@Inject(SessionsService) private readonly sessions: SessionsService
	) {}

	@UseGuards(SessionGuard)
	@Get('me')
	me(@Req() req: any) {
		return { ok: true, user: req.user };
	}

	@Get('csrf')
	getCsrf(@Res({ passthrough: true }) reply: FastifyReply) {
		const token = base64url(crypto.randomBytes(32));
		reply.setCookie(CSRF_COOKIE, token, {
			path: '/',
			httpOnly: false,
			sameSite: crossSite ? 'none' : 'lax',
			secure: isProd,
			maxAge: 60 * 60 * 24
		});

		return { csrfToken: token };
	}

	@Post('register')
	async register(@Body() dto: RegisterDto, @Req() req: any, @Res({ passthrough: true }) reply: FastifyReply) {
		const res = await this.auth.register(dto.email, dto.password, dto.displayName, dto.appKey);
		const ua = req.headers['user-agent'] ?? undefined;
		const ip = req.ip;
		const { token, expiresAt } = await this.sessions.create(res.userId, ip, String(ua));
		setSessionCookie(reply, token, {
			name: COOKIE_NAME,
			crossSite,
			maxAgeSec: 60 * 60 * 24 * 7,
			secure: isProd
		});

		// rotate CSRF on auth change
		const csrfToken = base64url(crypto.randomBytes(32));
		reply.setCookie(CSRF_COOKIE, csrfToken, {
			path: '/',
			httpOnly: false,
			sameSite: crossSite ? 'none' : 'lax',
			secure: isProd,
			maxAge: 60 * 60 * 24
		});

		reply.header('Cache-Control', 'no-store');
		return { ok: true, csrfToken };
	}

	@Post('login')
	async login(@Body() dto: LoginDto, @Req() req: any, @Res({ passthrough: true }) reply: FastifyReply) {
		const res = await this.auth.login(dto.email, dto.password);
		const ua = req.headers['user-agent'] ?? undefined;
		const ip = req.ip;
		const { token, expiresAt } = await this.sessions.create(res.userId, ip, String(ua));
		setSessionCookie(reply, token, { name: COOKIE_NAME, crossSite, maxAgeSec: 60 * 60 * 24 * 7, secure: isProd });

		// rotate CSRF on auth change
		const csrfToken = base64url(crypto.randomBytes(32));
		reply.setCookie(CSRF_COOKIE, csrfToken, {
			path: '/',
			httpOnly: false,
			sameSite: crossSite ? 'none' : 'lax',
			secure: isProd,
			maxAge: 60 * 60 * 24
		});

		reply.header('Cache-Control', 'no-store');
		return { ok: true, csrfToken };
	}

	@Post('logout')
	async logout(@Res({ passthrough: true }) reply: FastifyReply) {
		const token = reply.request.cookies?.[COOKIE_NAME];
		if (token) await this.sessions.revoke(token);
		reply.clearCookie(COOKIE_NAME, {
			path: '/',
			sameSite: crossSite ? 'none' : 'lax',
			secure: isProd
		});
		reply.clearCookie(CSRF_COOKIE, {
			path: '/',
			sameSite: crossSite ? 'none' : 'lax',
			secure: isProd
		});
		return { ok: true };
	}
}
