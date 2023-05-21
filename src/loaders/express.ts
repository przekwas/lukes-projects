import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import { indexRouter } from '../api/routes';
import { globalErrorHandler, notFoundHandler } from '../middlewares';
import { config } from '../config';
import { stream } from '../utils';
import type { Application } from 'express';

export async function expressLoader({ app }: { app: Application }) {
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

	// rate limiting
	const limiter = rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100 // limit each IP to 100 requests per windowMs
	});
	app.use(limiter);

	// prevent http param pollution
	app.use(hpp());

	app.use(morgan('combined', { stream }));

	// routes
	app.use(config.api.prefix, indexRouter());

	// error handler middlewares
	app.use(notFoundHandler);
	app.use(globalErrorHandler);
}
