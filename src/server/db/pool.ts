import * as mysql from 'mysql';
import * as knex from 'knex';
import config from '../config';

export default mysql.createPool(config.mysql);

export const knexPool = knex(config.knex);