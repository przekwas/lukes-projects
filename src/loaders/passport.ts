import passport from 'passport';
import LocalStrategy from 'passport-local';
import passportJwt from 'passport-jwt';
import config from '@config';
import logger from '@logger';

export default async ({ app }) => {
	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((user, done) => done(null, user));

	passport.use(new LocalStrategy.Strategy(async (email, password, done) => {}));

	passport.use(new passportJwt.Strategy({
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.secret,
        issuer: config.jwt.issuer
    }, async (jwt_payload, done) => {}));

    app.use(passport.initialize());
};
