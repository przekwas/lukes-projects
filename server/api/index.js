const express = require('express');
const test = require('./routes/test');

module.exports = () => {
	const app = express.Router();
	test(app);

	return app;
};
