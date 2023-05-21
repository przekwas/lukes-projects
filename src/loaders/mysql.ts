import { createPool, Pool } from 'mysql2/promise';
import { config } from '../config';
import { logger } from '../utils';

let pool: Pool | null = null;

export function getPool(): Pool | null {
	if (pool) {
		return pool;
	}

	logger.error('No connection pool found. Did you forget to call mysqlLoader()?');
	return null;
}

export async function mysqlLoader() {
	try {
		pool = await createPool(config.mysql);
		const connection = await pool.getConnection();
		logger.info('Successfully connected to MySQL.');

		connection.release();
	} catch (error) {
		logger.error('Could not connect to MySQL: ', error);
		throw error;
	}
}
