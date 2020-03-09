const express = require('express');
const passport = require('passport');
const middlewares = require('../middlewares');
const logger = require('../../loaders/logger');
const usersModel = require('../../models/users');
const tokensModel = require('../../models/tokens');
const UserService = require('../../services/users');
const router = express.Router();
const userServiceInstance = new UserService(logger, usersModel, tokensModel);

module.exports = app => {
	app.use('/auth', router);

	router.get('/me', middlewares.hasToken, middlewares.isGuest, async (req, res, next) => {
		try {
			res.json(req.user);
		} catch (error) {
			logger.error('🔥 error: %o', error);
			return next(error);
		}
	});

	router.post('/register', async (req, res, next) => {
		try {
			const userDTO = req.body;
			const { token } = await userServiceInstance.create(userDTO);
			res.status(201).json({ token });
		} catch (error) {
			logger.error('🔥', error);
			return next(error);
		}
	});

	router.post('/login', passport.authenticate('local'), async (req, res, next) => {
		try {
			const { token } = await userServiceInstance.login(req.user);
			res.status(201).json({ token });
		} catch (error) {
			logger.error('🔥', error);
			return next(error);
		}
	});
};
