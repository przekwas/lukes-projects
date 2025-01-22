import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			secretOrKey: process.env.JWT_SECRET || 'someSecretKeyREPLACEFROM_ENV_PLZ',
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
