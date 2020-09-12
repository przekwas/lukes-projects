import expressLoader from './express';
import passportLoader from './passport';
import knex from './knex';
import logger from './logger';

export default async function ({ expressApp }) {
	await knex.raw('select 1+1 as result');
	logger.info('✌️ knex loaded');

	await passportLoader({ app: expressApp });
	logger.info('✌️ passport loaded');

	await expressLoader({ app: expressApp });
	logger.info('✌️ express loaded');
}
