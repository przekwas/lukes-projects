import jwt from 'jsonwebtoken';
import config from '../config';

export function createToken(payload) {
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
