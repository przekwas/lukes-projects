import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './register.dto.js';
import { LoginDto } from './login.dto.js';

@Controller('auth')
export class AuthController {
	constructor(@Inject(AuthService) private readonly auth: AuthService) {}

	@Post('register')
	register(@Body() dto: RegisterDto) {
		return this.auth.register(dto.email, dto.password, dto.displayName, dto.appKey);
	}

	@Post('login')
	login(@Body() dto: LoginDto) {
		return this.auth.login(dto.email, dto.password);
	}
}
