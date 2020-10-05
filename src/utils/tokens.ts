import config from '../config';
import jwt from 'jsonwebtoken';

import type { Payload } from '../types/jwt';

export function generate(payload: Payload) {
	try {
		const token = jwt.sign(payload, config.jwt.secret, {
			issuer: config.jwt.issuer,
			expiresIn: config.jwt.expires
        });
        return token;
	} catch (error) {
		throw error;
	}
}
