import passport from 'passport';
import LocalStrategy from 'passport-local';
import passportJwt from 'passport-jwt';
import config from '@config';
import logger from '@logger';
import db from '@db';

export default async ({ app }) => {
	passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

	passport.use(
		new LocalStrategy.Strategy({ usernameField: 'email' }, async (email, password, done) => {
			logger.silly('derp');
			done(null, 'derp');
			// 	try {
			// 		const [user] = await db.users.find('email', email);
			// 		logger.silly(user);
			// 		done(null, user);
			// 	} catch (error) {
			// 		logger.silly('error in local strategy');
			// 		logger.error(error);
			// 		done(null, error);
			// 	}
		})
	);

	// passport.use(new passportJwt.Strategy({
	//     jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
	//     secretOrKey: config.jwt.secret,
	//     issuer: config.jwt.issuer
	// }, async (jwt_payload, done) => {}));

	app.use(passport.initialize());
};
