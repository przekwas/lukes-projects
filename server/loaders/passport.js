const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Logger = require('./logger');
const usersModel = require('../models/users');
const UserService = require('../services/users');
const config = require('../config');

module.exports = ({ app }) => {
	const UserServiceInstance = new UserService(Logger, usersModel);

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
					done(null, payload);
				}
			} catch (error) {
				Logger.error(error);
				done(error);
			}
		})
	);

	app.use(passport.initialize());
};
