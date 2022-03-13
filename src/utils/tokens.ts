import jwt from 'jsonwebtoken';
import { config } from '@/config';
import type { ReqPayload } from '@/types/express';

export function createToken(payload: ReqPayload) {
	try {
		const token = jwt.sign(payload, config.jwt.secret, {
			expiresIn: config.jwt.expiresIn,
			issuer: config.jwt.issuer
		});
		return token;
	} catch (error) {
		throw error;
	}
}