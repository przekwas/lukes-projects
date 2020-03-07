const express = require('express');
const users = require('./routes/users');

module.exports = () => {
	const app = express.Router();
	users(app);

	return app;
};