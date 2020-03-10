const express = require('express');
const logger = require('../../loaders/logger');
const usersModel = require('../../models/users');
const tokensModel = require('../../models/tokens');
const UserService = require('../../services/users');
const router = express.Router();
const userServiceInstance = new UserService(logger, usersModel, tokensModel);

module.exports = app => {
	app.use('/users', router);

	router.get('/', async (req, res, next) => {
		try {
			const users = await userServiceInstance.getUsers();
			res.status(200).json(users);
		} catch (error) {
			logger.error('🔥 error: %o', error);
			return next(error);
		}
	});

	router.get('/details/:id', async (req, res, next) => {
		try {
			const id = req.params.id;
			const user = await userServiceInstance.getUser(id);
			res.status(200).json(user);
		} catch (error) {
			logger.error('🔥', error);
			return next(error);
		}
	});
};
