import httpStatus from 'http-status';
import type { UserRole } from '../types';
import type { Request, Response, NextFunction } from 'express';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
	const payload = req.payload;

	if (!payload || payload.role !== (9 as UserRole)) {
		return res.status(httpStatus.UNAUTHORIZED).json({ message: 'unauthorized' });
	}

	return next();
}

export function isAuth(req: Request, res: Response, next: NextFunction) {
	const payload = req.payload;
	const allowedRoles = new Set<string | UserRole>(Object.values({ USER: 0, ADMIN: 9 }));

	if (!payload || !(payload.role !== undefined && allowedRoles.has(payload.role))) {
		return res.status(httpStatus.UNAUTHORIZED).json({ message: 'unauthorized' });
	}

	return next();
}
