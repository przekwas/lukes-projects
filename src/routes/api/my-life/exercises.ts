import { Router } from 'express';
import { db } from '@/db';
import { v4 as uuidv4 } from 'uuid';
import { checkToken, isAuth } from '@/middlewares';

export const exercisesRouter = Router();

exercisesRouter.route('*').post(checkToken, isAuth);

// get all for user
exercisesRouter.get('/user', checkToken, isAuth, async (req, res, next) => {
	try {
		const user_id = req.payload.id;
		const results = await db.myLife.exercises.allForUser(user_id);
		res.json(results);
	} catch (error) {
		next(error);
	}
});

// get all for user and set
exercisesRouter.get('/user/workout/:workout_id', checkToken, isAuth, async (req, res, next) => {
	try {
        const user_id = req.payload.id;
        const workout_id = req.params.workout_id;
		const results = await db.myLife.exercises.allForUserAndSet(user_id, workout_id);
		res.json(results);
	} catch (error) {
		next(error);
	}
});

// get one
exercisesRouter.get('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const [results] = await db.myLife.exercises.one(id);
		res.json(results);
	} catch (error) {
		next(error);
	}
});

// get all
exercisesRouter.get('/', async (req, res, next) => {
	try {
		const results = await db.myLife.exercises.all();
		res.json(results);
	} catch (error) {
		next(error);
	}
});

exercisesRouter.post('/', async (req, res, next) => {
	try {
		const dto = req.body;
		dto.id = uuidv4();
		dto.user_id = req.payload.id;
		const result = await db.myLife.exercises.insert(dto);
		res.json(result);
	} catch (error) {
		next(error);
	}
});
