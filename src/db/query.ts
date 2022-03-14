import { format } from 'mysql';
import { get } from '@/loaders/mysql';
import { logger } from '@/utils';

interface MySQLResponse {
	fieldCount: number;
	affectedRows: number;
	insertId: number;
	serverStatus: number;
	warningCount: number;
	message: string;
	protocol41: boolean;
	changedRows: number;
}

export function Query<T = MySQLResponse>(query: string, values?: any) {
	return new Promise<T>((resolve, reject) => {
		const sql = format(query, values);
		logger.debug(sql);
		get().query(sql, (error, results) => {
			if (error) {
				return reject(error);
			}

			return resolve(results);
		});
	});
}