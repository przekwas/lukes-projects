import mysql from 'mysql';
import { get } from '../loaders/mysql';
import logger from '@logger';

export const Query = <T = any>(query: string, values?: any) => {
	const sql = mysql.format(query, values);
	logger.debug('executing query\n' + sql);

	return new Promise<T>((resolve, reject) => {
		get().query(sql, (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
};

import users from './queries/users';
import tokens from './queries/tokens';

export default {
    users,
    tokens
}