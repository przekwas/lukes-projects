import passport from 'passport';
import PassportLocal from 'passport-local';
import PassportJWT, { ExtractJwt } from 'passport-jwt';
import { users } from '@/db/tables';
import { comparePasswords } from '@/utils';
import { config } from '@/config';
import type { Application } from 'express';

export async function passportLoader({ app }: { app: Application }) {
	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((user, done) => done(null, user));

	passport.use(
		new PassportLocal.Strategy({ usernameField: 'email' }, async (email, password, done) => {
			try {
				const [user] = await users.find('email', email);
				if (
					user &&
					user.banned === 0 &&
					(await comparePasswords(password, user.password))
				) {
					delete user.password;
					done(null, user);
				} else {
					done(null, false, { message: 'invalid email or password' });
				}
			} catch (error) {
				done(error);
			}
		})
	);

	passport.use(
		new PassportJWT.Strategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				issuer: config.jwt.issuer,
				secretOrKey: config.jwt.secret
			},
			async (payload, done) => {
				try {
					done(null, payload);
				} catch (error) {
					done(error);
				}
			}
		)
	);

	app.use(passport.initialize());
}
