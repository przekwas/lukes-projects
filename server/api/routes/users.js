const express = require('express');
const logger = require('../../loaders/logger');
const usersModel = require('../../models/users');
const tokensModel = require('../../models/tokens');
const UserService = require('../../services/users');
const router = express.Router();
const userServiceInstance = new UserService(usersModel, tokensModel, logger);

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

	router.get('/:id', async (req, res, next) => {
		try {
			const id = req.params.id;
			const user = await userServiceInstance.getUser(id);
			res.status(200).json(user);
		} catch (error) {
			logger.error('🔥', error);
			return next(error);
		}
	});

	router.post('/register', async (req, res, next) => {
		try {
			const userDTO = req.body;
			const { token, refresh } = await userServiceInstance.create(userDTO);
			res.status(201).json({ token, refresh });
		} catch (error) {
			logger.error('🔥', error);
			return next(error);
		}
	});

	router.post('/login', async (req, res, next) => {
		try {
			const userDTO = req.body;
			await userServiceInstance.login(userDTO);
			res.status(201).json('test');
		} catch (error) {
			logger.error('🔥', error);
			return next(error);
		}
	});
};