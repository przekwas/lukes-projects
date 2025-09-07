import { UseGuards, Body, Controller, Inject, Post, Res, Req, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './register.dto.js';
import { LoginDto } from './login.dto.js';
import { SessionsService } from './session.service.js';
import { PasswordResetService } from './password-reset.service.js';
import { SessionGuard } from './session.guard.js';
import { COOKIE } from '@lukes-projects/auth';
import { setSessionCookie, setCsrfCookie, clearCookie, newOpaqueToken, THIRTY_DAYS } from '@lukes-projects/shared';
import type { FastifyReply } from 'fastify';
import { crossSite, isProd } from '@lukes-projects/config';

import { IsEmail, IsString, MinLength } from 'class-validator';
// inline DTOs
class ForgotDto {
	@IsEmail() email!: string;
}
class ResetDto {
	@IsString() token!: string;
	@IsString() @MinLength(8) newPassword!: string;
}

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(AuthService) private readonly auth: AuthService,
		@Inject(SessionsService) private readonly sessions: SessionsService,
		@Inject(PasswordResetService) private readonly pw: PasswordResetService
	) {}

	// GET /auth/me
	@UseGuards(SessionGuard)
	@Get('me')
	me(@Req() req: any, @Res({ passthrough: true }) reply: FastifyReply) {
		reply.header('Cache-Control', 'no-store');
		return { ok: true, user: req.user };
	}

	// GET /auth/sessions
	@UseGuards(SessionGuard)
	@Get('sessions')
	async sessionsList(@Req() req: any) {
		const rows = await this.sessions.listForUser(req.user.id);
		return { ok: true, sessions: rows };
	}

	// POST /auth/sessions/revoke/:id
	@UseGuards(SessionGuard)
	@Post('sessions/revoke/:id')
	async sessionsRevoke(@Req() req: any, @Param('id') id: string) {
		await this.sessions.revokeById(req.user.id, id);
		return { ok: true };
	}

	// GET /auth/csrf
	@Get('csrf')
	getCsrf(@Res({ passthrough: true }) reply: FastifyReply) {
		const token = newOpaqueToken();
		setCsrfCookie(reply, token, { crossSite, secure: isProd, maxAgeSec: 60 * 60 * 24 });
		return { csrfToken: token };
	}

	// POST /auth/register
	@Post('register')
	async register(@Body() dto: RegisterDto, @Req() req: any, @Res({ passthrough: true }) reply: FastifyReply) {
		const res = await this.auth.register(dto.email, dto.password, dto.displayName, dto.appKey);
		const ua = req.headers['user-agent'] ?? undefined;
		const ip = req.ip;

		const { token } = await this.sessions.create(res.userId, ip, String(ua), THIRTY_DAYS);
		setSessionCookie(reply, token, { name: COOKIE.auth, crossSite, secure: isProd, maxAgeSec: THIRTY_DAYS });

		// rotate CSRF on auth change
		const csrfToken = newOpaqueToken();
		setCsrfCookie(reply, csrfToken, { crossSite, secure: isProd, maxAgeSec: 60 * 60 * 24 });

		reply.header('Cache-Control', 'no-store');
		return { ok: true, csrfToken };
	}

	// POST /auth/login
	@Post('login')
	async login(@Body() dto: LoginDto, @Req() req: any, @Res({ passthrough: true }) reply: FastifyReply) {
		const res = await this.auth.login(dto.email, dto.password);
		const ua = req.headers['user-agent'] ?? undefined;
		const ip = req.ip;

		const { token } = await this.sessions.create(res.userId, ip, String(ua), THIRTY_DAYS);
		setSessionCookie(reply, token, { name: COOKIE.auth, crossSite, secure: isProd, maxAgeSec: THIRTY_DAYS });

		// rotate CSRF on auth change
		const csrfToken = newOpaqueToken();
		setCsrfCookie(reply, csrfToken, { crossSite, secure: isProd, maxAgeSec: 60 * 60 * 24 });

		reply.header('Cache-Control', 'no-store');
		return { ok: true, csrfToken };
	}

	// POST /auth/logout
	@Post('logout')
	async logout(@Res({ passthrough: true }) reply: FastifyReply) {
		const token = reply.request.cookies?.[COOKIE.auth];
		if (token) await this.sessions.revoke(token);
		clearCookie(reply, COOKIE.auth, crossSite, isProd);
		clearCookie(reply, 'csrf', crossSite, isProd);
		return { ok: true };
	}

	// POST /auth/forgot
	@Post('forgot')
	async forgot(@Body() dto: ForgotDto, @Req() req: any) {
		const ua = req.headers['user-agent'] ?? undefined;
		const ip = req.ip;
		const { devToken } = await this.pw.request(dto.email, ip, String(ua));
		// JSON.stringify omits undefined fields
		// but let's be explicit fam
		return devToken ? { ok: true, devToken } : { ok: true };
	}

	// POST /auth/reset
	@Post('reset')
	async reset(@Body() dto: ResetDto, @Res({ passthrough: true }) reply: FastifyReply) {
		await this.pw.reset(dto.token, dto.newPassword);

		// clear any existing auth cookie w/ log out after reset
		clearCookie(reply, COOKIE.auth, crossSite, isProd);

		// issue fresh csrf for client to continue talking to api
		const csrfToken = newOpaqueToken();
		setCsrfCookie(reply, csrfToken, { crossSite, secure: isProd, maxAgeSec: 60 * 60 * 24 });

		reply.header('Cache-Control', 'no-store');
		return { ok: true, csrfToken };
	}
}
