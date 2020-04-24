import mysql from 'mysql';
import config from '@config';

const state = {
    pool: null
}

export const get = () => state.pool;

export default async () => {
    state.pool = mysql.createPool(config.mysql);
}