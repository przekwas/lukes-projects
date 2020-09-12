import knex from '../loaders/knex';
import logger from '../loaders/logger';
import { v4 as uuidv4 } from 'uuid';
import { generateHash, generateToken } from '../utils';
import type { UserModel } from 'types/models';

export async function login(user: UserModel) {
	try {
		logger.silly('user login: %o', user);
		const payload = { ...user };
		delete payload.created_at;
		delete payload.id;
		const token = generateToken({ userid: user.id, ...payload });
		return token;
	} catch (error) {
		throw error;
	}
}

export async function register(user: { email: string; password: string; [key: string]: string }) {
	try {
		logger.silly('user registering: %o', user);

		//check if email already registered
		const [found] = await knex('users').select().where({ email: user.email });
		if (found) {
			throw new Error('email already registered');
		}

		//generate uuid and an encrypted password
		user.id = uuidv4();
		user.hashed = await generateHash(user.password);
		delete user.password;

		//valid username check, optional upon registration
		const validName = /^[a-z0-9_]{3,16}$/.test(user.username);
		if (user.username && !validName) {
			throw new Error(
				'username breaks: alphanumeric string that may include _  having a length of 3 to 16 characters'
			);
		}

		await knex('users').insert(user);
		const payload = { userid: user.id, role: 1, banned: 0, email: user.email };
		if (user.username) {
			payload['username'] = user.username;
		}
		const token = generateToken(payload);
		return token;
	} catch (error) {
		throw error;
	}
}
