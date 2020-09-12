import expressLoader from './express';
import knex from './knex';
import logger from './logger';

export default async function ({ expressApp }) {
	await expressLoader({ app: expressApp });
	logger.info('✌️ express loaded');

	await knex.raw('select 1+1 as result');
	logger.info('✌️ knex loaded');
	
}
