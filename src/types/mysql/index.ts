export interface MySQLResponse {
	insertId: number;
	affectedRows: number;
}

export interface UsersTable {
	id?: string;
	first_name?: string;
	last_name?: string;
	username?: string;
	email?: string;
	discord_name?: string;
	hashed?: string;
	role?: 1 | 3 | 9;
	banned?: 0 | 1;
	validated?: 0 | 1;
	created_at?: string;
	modified_at?: string;
}
