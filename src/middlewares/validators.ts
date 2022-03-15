import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export function sessionId() {
	return body('session_id').isUUID(4)
}

export function validatesessionId(req: Request, res: Response, next: NextFunction) {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}

	return res.status(422).json({
		errors: 'bad session_id'
	});
}
