import mysql, { PoolConnection } from 'mysql';
import config from '@config';

const state = {
    pool: null
}

export const get = (): PoolConnection => state.pool;

export default async () => {
    state.pool = mysql.createPool(config.mysql);
}