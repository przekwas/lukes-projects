import { Query } from '../query';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from '../../utils';

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

export function find(col: string, val: string | number) {
    return Query<UsersTable[]>('SELECT * FROM users WHERE ?? = ?', [col, val]);
}

export async function register(newUser: UsersTable & { password?: string }) {
	try {
		const [usernameFound] = await find('username', newUser.username);
		const [emailFound] = await find('email', newUser.email);

		if (usernameFound || emailFound) {
			throw new Error('username or email already exist');
		}

		const validName = isUserNameValid(newUser.username);
		if (newUser.username && !validName) {
			throw new Error(
				'username must be alphanumeric string that may include _ and . having a length of 3 to 25 characters'
			);
		}

		newUser.id = uuidv4();
		newUser.hashed = await createHash(newUser.password);
		delete newUser.password;

		await Query('INSERT INTO users SET ?', [newUser]);

		return {
			id: newUser.id,
			username: newUser.username
		};
	} catch (error) {
		throw error;
	}
}

function isUserNameValid(username: string) {
	/* 
	  Usernames can only have: 
	  - Lowercase Letters (a-z)
	  - Uppercase Letters (a-z)
	  - Numbers (0-9)
	  - Dots (.)
	  - Underscores (_)
	*/
	const res = /^[a-zA-Z0-9_\.]+$/.exec(username);
	const valid = !!res;
	return valid;
}