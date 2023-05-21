import { Query } from '../query';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from '../../utils';
import { RowDataPacket } from 'mysql2';

export interface UsersTable {
	id?: string; // char(36)
	first_name?: string; // varchar(60)
	last_name?: string; // varchar(60)
	username?: string | null; // varchar(100)
	email?: string; // varchar(254)
	password?: string; // varchar(60)
	discord_name?: string | null; // varchar(25)
	role?: number; // tinyint(4)
	banned?: number; // tinyint(4)
	validated?: number; // tinyint(4)
	created_at?: Date; // datetime
	modified_at?: Date; // datetime
}

export async function find(col: string, val: string | number) {
	const [[results]] = (await Query('SELECT * FROM users WHERE ?? = ?', [
		col,
		val
	])) as RowDataPacket[][];
	return results;
}

export async function register(newUser: Partial<UsersTable> & { password?: string }) {
	try {
		if (!newUser.username || !newUser.email || !newUser.password) {
			throw new Error('Username, email and password are required');
		}

		if (!isValidEmail(newUser.email)) {
			throw new Error('Enter a valid email address');
		}

		if (!isUserNameValid(newUser.username)) {
			throw new Error(
				'Username must be alphanumeric string that may include _ and . having a length of 3 to 25 characters'
			);
		}

		const usernameFound = await find('username', newUser.username);
		const emailFound = await find('email', newUser.email);

		if (usernameFound || emailFound) {
			throw new Error('Username or email already registered');
		}

		newUser.id = uuidv4();
		newUser.password = await createHash(newUser.password);
		await Query('INSERT INTO users SET ?', newUser);
		return {
			id: newUser.id,
			email: newUser.email
		};
	} catch (error) {
		throw error;
	}
}

function isUserNameValid(username: string) {
	const res = /^[a-zA-Z0-9_.]{3,25}$/.exec(username);
	return !!res;
}

function isValidEmail(email: string) {
	return !!email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
}
