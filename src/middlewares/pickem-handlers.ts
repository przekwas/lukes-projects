import { Request, Response, NextFunction } from 'express';

export function checkPickemRole(req: Request, res: Response, next: NextFunction) {
	if (req.payload.role !== 3) {
		const error = new Error(`incorrect role`);
		error['status'] = 404;
		next(error);
	}

    next();
}