import { hiphop } from '../../../db';
import type { Request, Response, NextFunction } from 'express';

async function getAllController(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await hiphop.getAll();
		res.json({ status: 'success', message: 'Hiphop select successful', result });
	} catch (error) {
		next(error);
	}
}

async function getOneController(req: Request, res: Response, next: NextFunction) {
	try {
		const album_id = req.params.id as string;
		const result = await hiphop.getOne(album_id);
		res.json({ status: 'success', message: 'Hiphop select successful', result });
	} catch (error) {
		next(error);
	}
}

export { getAllController, getOneController };
