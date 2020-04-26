import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import db from '@db';
import config from '@config';
import type { IPayload } from '@interfaces/jwt';

export const createToken = async (payload: IPayload) => {
	payload.uniq = crypto.randomBytes(12).toString('hex');
	const { insertId } = await db.tokens.insert(payload);
	payload.id = insertId;
	const token = jwt.sign(payload, config.jwt.secret, { issuer: config.jwt.issuer});
	await db.tokens.update(token, insertId);
	return token;
};
