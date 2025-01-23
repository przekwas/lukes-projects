import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

// utility for passport-jwt extraction
function cookieExtractor(req: Request) {
	return req?.cookies?.access_token || null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			secretOrKey: process.env.JWT_SECRET as string,
			jwtFromRequest: cookieExtractor,
			ignoreExpiration: false
		});
	}

	async validate(payload: { sub: string, email: string }) {
		return {
			userId: payload.sub,
			email: payload.email
		};
	}
}
