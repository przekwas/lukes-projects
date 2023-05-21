import jwt from 'jsonwebtoken';
import { config } from '../config';
import { logger } from './logger';

import type { ReqPayload, TokenType } from '../types';

export function createToken(payload: ReqPayload, type: TokenType = 'access' as TokenType) {
	try {
		const token = jwt.sign({ ...payload, type }, config.jwt.secret, {
			expiresIn: config.jwt.expiresIn,
			issuer: config.jwt.issuer
		});

		return token;
	} catch (error) {
		logger.error(`Error generating ${type} token:`, error);
		throw new Error(`Error generating ${type} token`);
	}
}
