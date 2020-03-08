const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const routes = require('../api');
const config = require('../config');
const logger = require('./logger');

module.exports = ({ app }) => {
	// health endpoints
	app.get('/status', (req, res) => res.status(200).end());
	app.head('/status', (req, res) => res.status(200).end());

	// shows the real origin IP in the heroku
	app.enable('trust proxy');

	const morganStream = {
		write: text => {
			logger.info(text);
		}
	};

	app.use(morgan('combined', { stream: morganStream }));
	app.use(helmet());
	app.use(cors());
	app.use(compression());
	app.use(express.json());

	//TODO: add routes with api prefix
	app.use(config.api.prefix, routes());

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err['status'] = 404;
		next(err);
	});

	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.json({
			errors: {
				message: err.message
			}
		});
	});
};
