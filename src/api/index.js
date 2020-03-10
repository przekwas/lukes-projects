const express = require('express');
const users = require('./routes/users');
const auth = require('./routes/auth');
const notes = require('./routes/notes');

module.exports = () => {
	const app = express.Router();
	users(app);
	auth(app);
	notes(app);

	return app;
};