import { Query } from '../../db';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from '../../utils/bcrypt';
import type { UsersTable } from '../../types/mysql';

function find(col: string, val: string | number) {
	return Query<UsersTable[]>('SELECT * FROM users WHERE ?? = ?', [col, val]);
}

async function register(newUser: UsersTable & { password?: string }) {
	try {
		const [usernameFound] = await find('username', newUser.username);
		const [emailFound] = await find('email', newUser.email);

		if (usernameFound || emailFound) {
			throw new Error('username or email already exist');
		}

		const validName = /^(?i)[a-z0-9_]{3,25}$/.test(newUser.username);
		if (newUser.username && !validName) {
			throw new Error(
				'username must be alphanumeric string that may include _ having a length of 3 to 25 characters'
			);
		}

		newUser.id = uuidv4();
		newUser.hashed = await createHash(newUser.password);
		delete newUser.password;

		await Query('INSERT INTO users SET ?', [newUser]);

		return {
			id: newUser.id,
			username: newUser.username
		}
	} catch (error) {
		throw error;
	}
}

export { find, register };
