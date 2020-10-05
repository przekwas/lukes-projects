export type UserModel = {
	id?: string;
	first_name?: string;
	last_name?: string;
	username?: string;
	email?: string;
	password?: string;
	hashed?: string;
	role?: number;
	banned?: number;
	created_at?: Date;
};

export type BlogsModel = {
	id?: string;
	userid?: string;
	title?: string;
	content?: string;
	created_at?: Date;
}