import { Router } from 'express';
import { db } from '@/db';
import { v4 as uuidv4 } from 'uuid';
import { checkToken, isAuth } from '@/middlewares';

export const workoutsRouter = Router();

workoutsRouter.route('*').post(checkToken, isAuth);

// get one
workoutsRouter.get('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const [results] = await db.myLife.workouts.one(id);
		res.json(results);
	} catch (error) {
		next(error);
	}
});

workoutsRouter.post('/', async (req, res, next) => {
	try {
		const dto = req.body;
		dto.id = uuidv4();
		dto.user_id = req.payload.id;
		const result = await db.myLife.workouts.insert(dto);
		res.json(result);
	} catch (error) {
		next(error);
	}
});
