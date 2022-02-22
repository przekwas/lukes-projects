import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { indexRouter } from '@/routes';
import { globalErrorHandler, notFoundHandler } from '@/middlewares';
import { config } from '@/config';
import { logger } from '@/logger';
import type { Application } from 'express';

export async function expressLoader({ app }: { app: Application }) {
	// status checkpoints
	app.get('/status', (req, res) => res.status(200).end());
	app.head('/status', (req, res) => res.status(200).end());

	// real ip origin if behind reverse proxy
	app.enable('trust proxy');

	// middlewares
	app.use(
		helmet({
			contentSecurityPolicy: false
		})
	);
	app.use(cors());
	app.use(compression());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(morgan(config.logs.morgan, { stream: { write: (text: string) => logger.http(text) } }));

	// routes
	app.use(config.api.prefix, indexRouter);

	// error handler middlewares
	app.use(notFoundHandler);
	app.use(globalErrorHandler);
}
