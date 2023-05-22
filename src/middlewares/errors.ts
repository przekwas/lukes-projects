import httpStatus from 'http-status';
import { validationResult } from 'express-validator';
import { logger } from '../utils';
import type { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
	status?: number;
}

// 404 handler for express app
export function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
	const error: CustomError = new Error(`Path ${req.originalUrl} not found`);
	error.status = httpStatus.NOT_FOUND;
	next(error);
}

// global error handler for express app
export function globalErrorHandler(
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction
): Response {
	logger.error(err.message);

	const status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
	const message = err.message || httpStatus[status];

	return res.status(status).json({
		error: {
			message,
			status
		}
	});
}

// express-validator error handler
export function validateErrorHandler(req: Request, res: Response, next: NextFunction) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
}
