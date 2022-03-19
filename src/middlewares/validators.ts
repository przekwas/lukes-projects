import { query, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export function uuidValidator(type: string) {
	return query(type).isUUID(4)
}

export function validateRequest(req: Request, res: Response, next: NextFunction) {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}

	return res.status(422).json({
		errors: 'bad request'
	});
}