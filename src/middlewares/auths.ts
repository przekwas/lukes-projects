import type { Request, Response, NextFunction } from 'express';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
	if (!req.payload || req.payload.role !== 9) {
		return res.status(401).json({ message: 'unauthorized' });
	}

	return next();
}

export function isAuth(req: Request, res: Response, next: NextFunction) {
	if (!req.payload || ![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(req.payload.role)) {
		return res.status(401).json({ message: 'unauthorized' });
	}

	return next();
}