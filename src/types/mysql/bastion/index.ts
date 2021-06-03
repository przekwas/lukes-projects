export interface BastionCharactersTable {
	id?: string;
	user_id?: string;
	name?: string;
	race?: string;
	class?: string;
	specialty?: string;
	content?: string;
	avatar_url?: string;
	created_at?: string;
	modified_at?: string;
	modified_by?: string;
}

export interface BastionRegisterTable {
	user_id: string;
	random_code: number;
}