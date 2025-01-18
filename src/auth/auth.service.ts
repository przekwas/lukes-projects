import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}

	async login(email: string, password: string) {
		const user = await this.usersService.findOneByEmail(email);
		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new UnauthorizedException('Invalid credentials');
		}

		return { message: 'Login Success Yo!' };
	}
}
