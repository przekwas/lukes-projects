import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { RefreshToken } from './entities/refresh-token.entity';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		@InjectRepository(RefreshToken)
		private readonly tokenRepo: Repository<RefreshToken>
	) {}

	async login(email: string, password: string) {
		const user = await this.usersService.findOneByEmail(email);
		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const payload = { sub: user.id, email: user.email, role: user.role };
		const accessToken = this.jwtService.sign(payload);

		const refreshTokenStr = crypto.randomBytes(32).toString('hex');

		const expires = new Date();
		expires.setDate(expires.getDate() + 30);

		const refreshEntity = this.tokenRepo.create({
			token: refreshTokenStr,
			user,
			expiresAt: expires
		});
		await this.tokenRepo.save(refreshEntity);

		return {
			accessToken,
			refreshToken: refreshTokenStr
		};
	}

	async refresh(refreshTokenStr: string) {
		const tokenEntity = await this.tokenRepo.findOne({
			where: { token: refreshTokenStr },
			relations: ['user']
		});

		if (!tokenEntity) {
			throw new UnauthorizedException('Invalid refresh token');
		}

		if (tokenEntity.expiresAt && tokenEntity.expiresAt < new Date()) {
			throw new UnauthorizedException('Refresh token expired');
		}

		// TODO
		// rotate refresh token?

		// new access token
		const payload = { sub: tokenEntity.user.id, email: tokenEntity.user.email, role: tokenEntity.user.role };
		const newAccessToken = this.jwtService.sign(payload);

		return {
			accessToken: newAccessToken
			// new refresh?
		};
	}

	async logout(refreshToken: string) {
		await this.tokenRepo.delete({ token: refreshToken });
		return { message: 'Logged out successfully' };
	}
}
