import { mysqlLoader } from './mysql';
import { passportLoader } from './passport';
import { expressLoader } from './express';
import { logger } from '../utils';
import type { Application } from 'express';

export async function loaders({ app }: { app: Application }) {
	try {
		await mysqlLoader();
		logger.info('MySQL loaded');

		await passportLoader({ app });
		logger.info('Passport loaded');

		await expressLoader({ app });
		logger.info('Express loaded');
	} catch (error) {
		logger.error('Error occurred during an application startup', error);
		process.exit(1);
	}
}
