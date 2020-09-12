import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import config from '../config';
import routes from '../routes';
import logger, { stream } from './logger';

export default async function ({ app }: { app: express.Application }) {
	//status checkpoints
	app.get('/status', (req, res) => res.status(200).end());
	app.head('/status', (req, res) => res.status(200).end());
	
	//true logs for heroku
	app.enable('trust proxy');
	
	//middlewares
	app.use(helmet());
	app.use(compression());
	app.use(cors());
	app.use(express.json());
	app.use(morgan(config.logs.morgan, { stream }));

	//routes
	app.use(config.api.prefix, routes());

	//custom 404 handling
	app.use((req, res, next) => {
		const err = new Error('Not Found') as ResponseError;
		err['status'] = 404;
		next(err);
	});

	//global error handling
	app.use(
		(
			err: ResponseError,
			req: express.Request,
			res: express.Response,
			next: express.NextFunction
		) => {
			res.status(err.status || 500);
			logger.error(err);
			res.json({ errors: { message: err.message } });
		}
	);
}
