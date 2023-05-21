import express from 'express';
import { logger } from './utils';
import { config } from './config';

import type { Request, Response, NextFunction } from 'express';

async function startServer() {
	const app = express();

	(await import('./loaders')).loaders({ app });

	app.use((err: any, req: Request, res: Response, next: NextFunction) => {
		logger.error(err);
		res.status(500).send({ error: 'Internal Server Error' });
	});

	app.get('/healthcheck', (req, res) => res.sendStatus(200));

	const server = app
		.listen(config.server.port, () =>
			logger.info(`Server running on port ${config.server.port}`)
		)
		.on('error', error => {
			logger.error(error);
			process.exit(1);
		});

	process.on('SIGTERM', () => {
		logger.info('SIGTERM signal received: closing HTTP server');
		server.close(() => {
			logger.info('HTTP server closed');
		});
	});

	process.on('SIGINT', () => {
		logger.info('SIGINT signal received: closing HTTP server');
		server.close(() => {
			logger.info('HTTP server closed');
		});
	});
}

startServer();
