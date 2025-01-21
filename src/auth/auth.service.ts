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

		const payload = { sub: user.id, email: user.email };
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
}
