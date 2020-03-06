const express = require('express');
const router = express.Router();

module.exports = app => {
	app.use('/test', router);

	router.get('/', (req, res) => {
		res.status(200).json({ msg: 'TEST' });
	});
};
