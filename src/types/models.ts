export type UserModel = {
	id: string;
	first_name?: string;
	last_name?: string;
	username: string;
	email: string;
	hashed: string;
	role?: number;
	banned?: number;
	created_at?: Date;
};
