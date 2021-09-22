import mysql from 'mysql';
import { get } from '../loaders/mysql';
import type { MySQLResponse } from '../types/mysql';

export function Query<T = MySQLResponse>(query: string, values?: any) {
	return new Promise<T>((resolve, reject) => {
		const sql = mysql.format(query, values);
		get().query(sql, (error, results) => {
			if (error) {
				return reject(error);
			}

			return resolve(results);
		});
	});
}