import passport from 'passport';
import LocalStrategy from 'passport-local';
import passportJwt from 'passport-jwt';
import config from '@config';
import db from '@db';
import { comparePasswords } from '@utils/passwords';
import type { IPayload } from '@interfaces/jwt';

export default async ({ app }) => {
	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((user, done) => done(null, user));

	passport.use(
		new LocalStrategy.Strategy({ usernameField: 'email' }, async (email, password, done) => {
			try {
				const [user] = await db.users.find('email', email);
				if (user && comparePasswords(password, user.salt)) {
					delete user.salt;
					done(null, user);
				} else {
					done(null, false);
				}
			} catch (error) {
				done(error);
			}
		})
	);

	passport.use(
		new passportJwt.Strategy(
			{
				jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: config.jwt.secret,
				issuer: config.jwt.issuer
			},
			async (jwt_payload: IPayload, done) => {
				try {
					const [user] = await db.users.one(jwt_payload.userid);
					if (user) {
						delete user.salt;
						done(null, user);
					} else {
						done(null, false);
					}
				} catch (error) {
					done(error);
				}
			}
		)
	);

	app.use(passport.initialize());
};
