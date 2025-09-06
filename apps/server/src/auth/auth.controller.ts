import { UseGuards, Body, Controller, Inject, Post, Res, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './register.dto.js';
import { LoginDto } from './login.dto.js';
import { SessionsService } from './session.service.js';
import { SessionGuard } from './session.guard.js';
import { COOKIE } from '@lukes-projects/auth';
import { setSessionCookie, setCsrfCookie, clearCookie, newOpaqueToken } from '@lukes-projects/shared';
import type { FastifyReply } from 'fastify';
import { crossSite, isProd } from '@lukes-projects/config';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(AuthService) private readonly auth: AuthService,
		@Inject(SessionsService) private readonly sessions: SessionsService
	) {}

	@UseGuards(SessionGuard)
	@Get('me')
	me(@Req() req: any, @Res({ passthrough: true }) reply: FastifyReply) {
		reply.header('Cache-Control', 'no-store');
		return { ok: true, user: req.user };
	}

	@Get('csrf')
	getCsrf(@Res({ passthrough: true }) reply: FastifyReply) {
		const token = newOpaqueToken();
		setCsrfCookie(reply, token, { crossSite, secure: isProd, maxAgeSec: 60 * 60 * 24 });
		return { csrfToken: token };
	}

	@Post('register')
	async register(@Body() dto: RegisterDto, @Req() req: any, @Res({ passthrough: true }) reply: FastifyReply) {
		const res = await this.auth.register(dto.email, dto.password, dto.displayName, dto.appKey);
		const ua = req.headers['user-agent'] ?? undefined;
		const ip = req.ip;

		const { token } = await this.sessions.create(res.userId, ip, String(ua));

		setSessionCookie(reply, token, {
			name: COOKIE.auth,
			crossSite,
			maxAgeSec: 60 * 60 * 24 * 7,
			secure: isProd
		});

		// rotate CSRF on auth change
		const csrfToken = newOpaqueToken();
		setCsrfCookie(reply, csrfToken, { crossSite, secure: isProd, maxAgeSec: 60 * 60 * 24 });

		reply.header('Cache-Control', 'no-store');
		return { ok: true, csrfToken };
	}

	@Post('login')
	async login(@Body() dto: LoginDto, @Req() req: any, @Res({ passthrough: true }) reply: FastifyReply) {
		const res = await this.auth.login(dto.email, dto.password);
		const ua = req.headers['user-agent'] ?? undefined;
		const ip = req.ip;

		const { token } = await this.sessions.create(res.userId, ip, String(ua));
		setSessionCookie(reply, token, {
			name: COOKIE.auth,
			crossSite,
			maxAgeSec: 60 * 60 * 24 * 7,
			secure: isProd
		});

		// rotate CSRF on auth change
		const csrfToken = newOpaqueToken();
		setCsrfCookie(reply, csrfToken, { crossSite, secure: isProd, maxAgeSec: 60 * 60 * 24 });

		reply.header('Cache-Control', 'no-store');
		return { ok: true, csrfToken };
	}

	@Post('logout')
	async logout(@Res({ passthrough: true }) reply: FastifyReply) {
		const token = reply.request.cookies?.[COOKIE.auth];
		if (token) await this.sessions.revoke(token);
		clearCookie(reply, COOKIE.auth, crossSite, isProd);
		clearCookie(reply, 'csrf', crossSite, isProd);
		return { ok: true };
	}
}
