const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Logger = require('./logger');
const usersModel = require('../models/users');
const UserService = require('../services/users');
const tokensModel = require('../models/tokens');
const TokensSerive = require('../services/tokens');
const config = require('../config');

module.exports = ({ app }) => {
	const UserServiceInstance = new UserService(Logger, usersModel);
	const TokensServiceInstance = new TokensSerive(Logger, tokensModel);

	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((user, done) => done(null, user));

	passport.use(
		new LocalStrategy.Strategy({ usernameField: 'email' }, async (email, password, done) => {
			try {
				const user = await UserServiceInstance.getUserEmail(email);
				if (user && user.email && bcrypt.compareSync(password, user.password)) {
					done(null, user);
				} else {
					done(null, false);
				}
			} catch (error) {
				Logger.error(error);
				done(error);
			}
		})
	);

	passport.use(
		new BearerStrategy.Strategy(async (token, done) => {
			try {
				const payload = jwt.verify(token, config.jwtSecret);
				if (payload) {
					const matched = await TokensServiceInstance.matchPayloadToken(payload.tokenid, payload.userid, token);
					const user = await UserServiceInstance.getUser(matched.userid);
					if (matched && user.id === payload.userid && user.id === matched.userid) {
						Logger.silly('Bearer Sauce good!');
						delete user.password;
						done(null, user);
					} else {
						Logger.silly('Payload verified but userid failed');
						throw new Error('JWT Failed');
					}
				}
			} catch (error) {
				Logger.error(error);
				done(error);
			}
		})
	);

	app.use(passport.initialize());
};
