import { Query } from '../db';
import type { UsersTable } from '../types/mysql';

function find(col: string, val: string | number) {
	return Query<UsersTable[]>('SELECT * FROM users WHERE ?? = ?', [col, val]);
}

export { find };