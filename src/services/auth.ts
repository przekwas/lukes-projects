import knex from '../loaders/knex';
import { tokens, passwords } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import type { UserModel } from '../types/models';

export async function login(user: UserModel) {
	try {
		const token = tokens.generate({ userid: user.id, role: user.role, banned: user.banned });
		return token;
	} catch (error) {
		throw error;
	}
}

export async function register(user: UserModel) {
	try {
		const userFound = await knex('users')
			.select()
			.where({ email: user.email })
			.orWhere({ username: user.username });
		if (userFound.length) {
			throw new Error('username or email already registered');
		}

		const validName = /^[a-z0-9_]{3,16}$/.test(user.username);
		if (!validName) {
			throw new Error(
				'username breaks: alphanumeric string that may include _  having a length of 3 to 16 characters'
			);
		}

		user.id = uuidv4();
		user.hashed = await passwords.generateHash(user.password);
		delete user.password;
		await knex('users').insert(user);
		const token = tokens.generate({ userid: user.id, role: 1, banned: 0 });
		return token;
	} catch (error) {
		throw error;
	}
}
