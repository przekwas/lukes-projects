import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { COOKIE } from '@lukes-projects/auth';
import { SessionsService } from './session.service.js';

@Injectable()
export class SessionGuard implements CanActivate {
	constructor(@Inject(SessionsService) private readonly sessions: SessionsService) {}

	async canActivate(ctx: ExecutionContext) {
		const req = ctx.switchToHttp().getRequest();
		const token = req.cookies?.[COOKIE.auth];
		if (!token) return false;

		const user = await this.sessions.getUserByToken(token);
		if (!user) return false;

		req.user = user;
		return true;
	}
}
