import { PASSWORD_MIN_LENGTH } from './constants.js';

export type PasswordCheck = { ok: true } | { ok: false; reason: string };

export function checkPassword(plain: string): PasswordCheck {
	if (plain.length < PASSWORD_MIN_LENGTH) {
		return { ok: false, reason: `Password must be at least ${PASSWORD_MIN_LENGTH} characters` };
	}

	return { ok: true };
}

export const isAtLeast = (haveLevel: number, needLevel: number) => haveLevel >= needLevel;