import { Body, Controller, Inject, Post, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './register.dto.js';
import { LoginDto } from './login.dto.js';
import { SessionsService } from './session.service.js';
import type { FastifyReply } from 'fastify';
import { isProd } from '@lukes-projects/config';

const COOKIE_NAME = 'auth';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(AuthService) private readonly auth: AuthService,
		@Inject(SessionsService) private readonly sessions: SessionsService
	) {}

	@Post('register')
	async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) reply: FastifyReply) {
		const res = await this.auth.register(dto.email, dto.password, dto.displayName, dto.appKey);
		const { token, expiresAt } = await this.sessions.create(res.userId);
		reply.setCookie(COOKIE_NAME, token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: isProd,
			expires: expiresAt
		});
		return { ok: true };
	}

	@Post('login')
	async login(@Body() dto: LoginDto, @Res({ passthrough: true }) reply: FastifyReply) {
		const res = await this.auth.login(dto.email, dto.password);
		const { token, expiresAt } = await this.sessions.create(res.userId);
		reply.setCookie(COOKIE_NAME, token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: isProd,
			expires: expiresAt
		});
		return { ok: true };
	}

	@Post('logout')
	async logout(@Res({ passthrough: true }) reply: FastifyReply) {
		const token = reply.request.cookies?.[COOKIE_NAME];
		if (token) await this.sessions.revoke(token);
		reply.clearCookie(COOKIE_NAME, { path: '/' });
		return { ok: true };
	}
}
