import { format } from 'mysql2';
import { getPool } from '../loaders/mysql';
import { logger } from '../utils';

import type { OkPacket, RowDataPacket, ResultSetHeader, FieldPacket } from 'mysql2';

export async function Query(
	query: string,
	values?: any
): Promise<
	[OkPacket | RowDataPacket[] | RowDataPacket[][] | OkPacket[] | ResultSetHeader, FieldPacket[]]
> {
	const sql = format(query, values);
	logger.debug(sql);

	const pool = getPool();

	if (!pool) {
		throw new Error('Database pool is not initialized.');
	}

	const results = await pool.query(sql);
	return results;
}
