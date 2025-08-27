import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { hashPassword, verifyPassword } from '@lukes-projects/auth';

@Injectable()
export class AuthService {
	constructor(@Inject(UsersService) private users: UsersService) {}

	async register(email: string, password: string, displayName: string, appKey?: string) {
		const exists = await this.users.findByEmail(email);
		if (exists) throw new BadRequestException('Email already in use');

		const passwordHash = await hashPassword(password);
		const u = await this.users.createUser(email, passwordHash, displayName);

		if (appKey) await this.users.ensureMembership(u.id, appKey, 'member');

		return { ok: true, userId: u.id };
	}

	async login(email: string, password: string) {
		const u = await this.users.findByEmail(email);
		if (!u) throw new UnauthorizedException('Invalid credentials');

		const ok = await verifyPassword(u.passwordHash, password);
		if (!ok) throw new UnauthorizedException('Invalid credentials');

		return { ok: true, userId: u.id };
	}
}
