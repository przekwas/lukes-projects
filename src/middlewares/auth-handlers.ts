import type { Request, Response, NextFunction } from 'express';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
	if (!req.payload || req.payload.role !== 9) {
		return res.status(401).json({ message: 'unauthorized' });
	}

	return next();
}
