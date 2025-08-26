import { hash as argonHash, verify as argonVerify, Algorithm } from '@node-rs/argon2';

export const ARGON_OPTS = {
	memoryCost: 1 << 15,
	timeCost: 3,
	parallelism: 1,
	hashLength: 32,
	type: Algorithm.Argon2id
} as const;

export function hashPassword(plain: string): Promise<string> {
	return argonHash(plain, ARGON_OPTS);
}

export async function verifyPassword(stored: string, plain: string): Promise<boolean> {
	try {
		if (stored.startsWith('$argon2')) {
			return await argonVerify(stored, plain);
		}

		return false;
	} catch {
		return false;
	}
}
