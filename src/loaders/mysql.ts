import { createPool, PoolConnection } from 'mysql';
import { config } from '../config';

const state = {
	pool: null
};

export function get(): PoolConnection {
	return state.pool;
}

export async function mysqlLoader() {
	state.pool = createPool(config.mysql);
}
