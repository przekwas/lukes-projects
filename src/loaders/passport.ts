import passport from 'passport';
import PassportLocal from 'passport-local';
import PassportJWT, { ExtractJwt } from 'passport-jwt';
import { users } from '../db';
import { comparePasswords, logger } from '../utils';
import { config } from '../config';
import type { Application } from 'express';

export async function passportLoader({ app }: { app: Application }) {
	passport.use(
		new PassportLocal.Strategy(
			{ usernameField: 'email', session: false },
			async (email, password, done) => {
				try {
					const user = await users.find('email', email);
					if (user && user.banned === 0) {
						try {
							const match = await comparePasswords(password, user.password);
							if (match) {
								delete user.password;
								done(null, user);
							} else {
								done(null, false, { message: 'invalid email or password' });
							}
						} catch (err) {
							logger.error('Error while comparing passwords', err);
							done(err);
						}
					} else {
						done(null, false, { message: 'invalid email or password' });
					}
				} catch (error) {
					logger.error('Error in passport strategy', error);
					done(error);
				}
			}
		)
	);

	passport.use(
		new PassportJWT.Strategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				issuer: config.jwt.issuer,
				secretOrKey: config.jwt.secret
			},
			(payload, done) => {
				done(null, payload);
			}
		)
	);

	app.use(passport.initialize());
}
