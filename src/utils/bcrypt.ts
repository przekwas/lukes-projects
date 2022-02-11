import { genSalt, hash, compare } from 'bcrypt';

export async function createHash(password: string) {
	try {
		const salt = await genSalt(12);
		const hashed = await hash(password, salt);
		return hashed;
	} catch (error) {
		throw error;
	}
}

export async function comparePasswords(password: string, hashed: string) {
	try {
		const compared = await compare(password, hashed);
		return compared;
	} catch (error) {
		throw error;
	}
}
