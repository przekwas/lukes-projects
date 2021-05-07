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
	hashed?: string;
	role?: 1 | 9;
	banned?: 0 | 1;
	created_at?: string;
}

export interface ChirpsTable {
	id?: string;
	user_id?: string;
	content?: string;
	created_at?: string;
}