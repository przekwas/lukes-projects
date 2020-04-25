import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import config from '@config';
import logger, { stream } from '@logger';
import routes from '../api';

export default async ({ app }: { app: express.Application }) => {
	app.get('/status', (req, res) => res.status(200).end());
	app.head('/status', (req, res) => res.status(200).end());

	app.enable('trust proxy');

	app.use(helmet());
	app.use(compression());
	app.use(cors());
	app.use(morgan(config.logs.morgan, { stream }));
	app.use(express.json());
	app.use(config.api.prefix, routes());

	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err['status'] = 404;
		next(err);
	});

	app.use((err, req, res, next) => {
        res.status(err.status || 500);
        logger.error(err);
		res.json({
			errors: {
				message: err.message
			}
		});
	});
};
