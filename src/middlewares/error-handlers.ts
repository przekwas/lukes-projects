import { Request, Response, NextFunction } from 'express';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
	const error = new Error(`path ${req.originalUrl} not found`);
	error['status'] = 404;
	next(error);
}

export function globalErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
	console.log('[errors]', error);
	res.status(error['status'] || 500);
	res.json({ error: { message: error.message } });
}
