import config from 'config';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';

import type { ExpressError } from 'types/express';

export default async function ({ app }: { app: express.Application }) {
	//status checkpoints
	app.get('/status', (req, res) => res.status(200).end());
	app.head('/status', (req, res) => res.status(200).end());

	//use this if you're behind a reverse proxy
	app.enable('trust proxy');

	app.use(cors());
	app.use(express.json());

	//handle 404 and forward
	app.use((req, res, next) => {
		const error = new Error('not found');
		error['status'] = 404;
		next(error);
	});

	//handle 401 thrown by passport-jwt
	app.use(
		(
			error: ExpressError,
			req: express.Request,
			res: express.Response,
			next: express.NextFunction
		) => {
			if (error.name === 'UnauthorizedError') {
				return res.status(error.status).send({ message: error.message }).end();
			}

			return next(error);
		}
	);

	//global error handler
	app.use(
		(
			error: ExpressError,
			req: express.Request,
			res: express.Response,
			next: express.NextFunction
		) => {
			res.status(error.status || 500);
			res.json({
				errors: {
					message: error.message
				}
			});
		}
	);
}
