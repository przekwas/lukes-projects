import { Router } from 'express';
import { db } from '@/db';
import { createToken } from '@/utils';

export const registerRouter = Router();

registerRouter.post('/', async (req, res, next) => {
	try {
		const dto = req.body;
		const query = Number(req.query.role);
		console.log(query);
		if (query && query !== 9) {
			const { id, username } = await db.users.register(dto);
			const token = createToken({ id, username, role: 1, banned: 0 });
			res.json(token);
		} else {
			throw new Error('role incorrect or missing');
		}
	} catch (error) {
		next(error);
	}
});
