import mysql, { PoolConnection } from 'mysql';
import config from '../config';

const state = {
    pool: null
}

export function get(): PoolConnection {
    return state.pool;
}

export default async function() {
    state.pool = mysql.createPool(config.mysql);
}