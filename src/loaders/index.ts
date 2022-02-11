import { mysqlLoader } from './mysql';
import { passportLoader } from './passport';
import { expressLoader } from './express';
import { logger } from './logger';
import type { Application } from 'express';

export async function loaders({ app }: { app: Application }) {
	await mysqlLoader();
	logger.info('mysql loaded');

	await passportLoader({ app });
	logger.info('passport loaded');

	await expressLoader({ app });
	logger.info('express loaded');
}
