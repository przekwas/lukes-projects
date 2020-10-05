import * as utils from '../utils';
import type { UserModel } from '../types/models';

export async function login(user: UserModel) {
	try {
		const token = utils.tokens.generate({ userid: user.id, role: user.role, banned: user.banned });
		return token;
	} catch (error) {
		throw error;
	}
}
