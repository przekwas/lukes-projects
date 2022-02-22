import { format } from 'mysql';
import { get } from '../loaders/mysql';

interface MySQLResponse {
	insertId: number;
	affectedRows: number;
}

export function Query<T = MySQLResponse>(query: string, values?: any) {
	return new Promise<T>((resolve, reject) => {
		const sql = format(query, values);
		get().query(sql, (error, results) => {
			if (error) {
				return reject(error);
			}

			return resolve(results);
		});
	});
}
