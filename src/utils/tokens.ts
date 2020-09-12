import jwt from 'jsonwebtoken';
import config from '../config';
import type { IPayload } from '../types';

export function generateToken(payload: IPayload) {
	try {
        const token = jwt.sign(payload, config.jwt.secret, { issuer: config.jwt.issuer, expiresIn: '5m' });
        return token;
    } catch (error) {
        throw error;
    }
}
