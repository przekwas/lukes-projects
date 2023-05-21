import { genSalt, hash, compare } from 'bcrypt';

export async function createHash(password: string): Promise<string> {
	const salt = await genSalt(12);
	return hash(password, salt);
}

export async function comparePasswords(password: string, hashed: string): Promise<boolean> {
	return compare(password, hashed);
}
