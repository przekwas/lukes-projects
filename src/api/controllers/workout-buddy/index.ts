import type { Request, Response, NextFunction } from 'express';

export async function getAllSessionsForUserController(req: Request, res: Response, next: NextFunction) {
	try {
		res.json({ status: 'getAllSessionsForUserController' });
	} catch (error) {
		next(error);
	}
}