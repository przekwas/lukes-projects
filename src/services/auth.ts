import db from '@db';
import logger from '@logger';
import { createToken } from '@utils/tokens';
import { generateSalted } from '@utils/passwords';
import type { IUser } from '@interfaces/models';
import type { IUserDTO } from '@interfaces/services';

export const loginUser = async (user: IUser) => {
	try {
		logger.silly('user logging in: %o ', user);
		const token = await createToken({ userid: user.id });
		return { token, role: user.role };
	} catch (error) {
		throw error;
	}
};

export const registerUser = async (user: IUserDTO) => {
	try {
		logger.silly('user registering: %o ', user);
		const [found] = await db.users.find('email', user.email);

		if (found) {
			throw new Error('email already registered');
		}

		const validName = /^[a-z0-9_]{3,16}$/.test(user.username);
		if (!validName) {
			throw new Error(
				'username breaks: alphanumeric string that may include _  having a length of 3 to 16 characters'
			);
		}

		user.salt = generateSalted(user.password);
		delete user.password;
		const { insertId } = await db.users.insert(user);
		const token = await createToken({ userid: insertId });
		return { token, role: 'guest' };
	} catch (error) {
		throw error;
	}
};
