import passport from 'passport';
import PassportLocal from 'passport-local';
import config from '../config';
import PassportJWT, { ExtractJwt } from 'passport-jwt';
import { Application } from 'express';
import { comparePasswords } from '../utils/bcrypt';
import * as users from '../services/auth';

export default async function ({ app }: { app: Application }) {
	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((user, done) => done(null, user));

	passport.use(
		new PassportLocal.Strategy({ usernameField: 'email' }, async (email, password, done) => {
			try {
				const [user] = await users.find('email', email);
				console.log(user)
				if (
					user &&
					user.validated === 1 &&
					(await comparePasswords(password, user.hashed))
				) {
					delete user.hashed;
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
