import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import routes from '../routes';
import config from '../config';
import { globalErrorHandler, notFoundHandler } from '../middlewares';
import { errors } from 'celebrate';

export default async function ({ app }: { app: Application }) {
	// status checkpoints
	app.get('/status', (req, res) => res.status(200).end());
	app.head('/status', (req, res) => res.status(200).end());

	app.enable('trust proxy');

	app.use(cors());
	app.use(helmet());
	app.use(compression());
	app.use(express.json());
	app.use(morgan('dev'));
	app.use(config.api.prefix, routes);

    app.use(errors());

	app.use(notFoundHandler);
	app.use(globalErrorHandler);
}
