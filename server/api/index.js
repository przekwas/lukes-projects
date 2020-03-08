const express = require('express');
const users = require('./routes/users');
const auth = require('./routes/auth');

module.exports = () => {
	const app = express.Router();
	users(app);
	auth(app);

	return app;
};