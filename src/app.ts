import express from 'express';
import { logger } from '@/logger';
import { config } from './config';

async function startServer() {
	const app = express();

	(await import('./loaders')).loaders({ app });

	app.listen(config.port, () =>
		logger.info(`server running on port ${config.port}`)
	).on('error', error => {
		logger.error(error);
		process.exit(1);
	});
}

startServer();