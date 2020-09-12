export interface UserModel {
	id: string;
	first_name?: string;
	last_name?: string;
	username?: string;
	email: string;
	hashed: string;
	// role of 1 is guest, 2 is admin
	role: 1 | 2;
	// banned of 0 is ok, 1 is banhammer
	banned: 0 | 1;
	created_at: Date;
}
