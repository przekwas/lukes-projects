import { Req, Res, Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { Request, Response } from 'express';

// constants for the cookie stuff
// TODO move to env config?
const ACCESS_COOKIE_NAME = 'access_token';
const REFRESH_COOKIE_NAME = 'refresh_token';
const ACCESS_TOKEN_EXPIRY = 15 * 60 * 1000; // 15 minutes
const REFRESH_TOKEN_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
		const { accessToken, refreshToken } = await this.authService.login(dto.email, dto.password);

		res.cookie(ACCESS_COOKIE_NAME, accessToken, {
			httpOnly: true,
			secure: false, // TODO set to true in prod with https
			sameSite: 'strict',
			maxAge: ACCESS_TOKEN_EXPIRY
		});

		res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
			httpOnly: true,
			secure: false, // TODO set to true in prod with https
			sameSite: 'strict',
			maxAge: REFRESH_TOKEN_EXPIRY
		});

		return { message: 'Logged in' };
	}

	@Post('refresh')
	async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const refreshToken = req.cookies[REFRESH_COOKIE_NAME];
		if (!refreshToken) {
			throw new UnauthorizedException('No refresh token cookie');
		}

		const { accessToken: newAccessToken } = await this.authService.refresh(refreshToken);

		res.cookie(ACCESS_COOKIE_NAME, newAccessToken, {
			httpOnly: true,
			secure: false, // TODO set to true in prod with https
			sameSite: 'strict',
			maxAge: ACCESS_TOKEN_EXPIRY
		});

		return { message: 'Token refreshed' };
	}

	@Post('logout')
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const refreshToken = req.cookies[REFRESH_COOKIE_NAME];
		await this.authService.logout(refreshToken);
	  
		res.clearCookie(ACCESS_COOKIE_NAME, { httpOnly: true });
		res.clearCookie(REFRESH_COOKIE_NAME, { httpOnly: true });
	  
		return { message: 'Logged out' };
	  }
}
