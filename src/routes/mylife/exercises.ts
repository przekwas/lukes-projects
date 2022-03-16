import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { mylife } from '@/db/tables';
import { checkToken, validators } from '@/middlewares';

const route = Router();

export function exercisesRouter(app: Router) {
	app.use('/exercises', route);

	// all exercises for a user from jwt
	route.get('/user', checkToken, async (req, res, next) => {
		try {
			const user_id = req.payload.id;
			const result = await mylife.exercises.find({ user_id });
			res.json(result);
		} catch (error) {
			next(error);
		}
	});

	// all exercises for a user and one set from jwt
	route.get(
		'/user/set',
		validators.uuidValidator('set_id'),
		validators.validateRequest,
		checkToken,
		async (req, res, next) => {
			try {
				const user_id = req.payload.id;
				const set_id = req.body.set_id;
				const result = await mylife.exercises.find({ user_id, set_id });
				res.json(result);
			} catch (error) {
				next(error);
			}
		}
	);

	// all exercises for a user and one session from jwt
	route.get(
		'/user/session',
		validators.uuidValidator('session_id'),
		validators.validateRequest,
		checkToken,
		async (req, res, next) => {
			try {
				const user_id = req.payload.id;
				const session_id = req.body.session_id;
				const result = await mylife.exercises.find({ user_id, session_id });
				res.json(result);
			} catch (error) {
				next(error);
			}
		}
	);

	route.post('/', checkToken, async (req, res, next) => {
		try {
			const user_id = req.payload.id;
			const dto = { ...req.body, user_id, id: uuidv4() };
			const result = await mylife.exercises.insert(dto);
			res.json({ ...result, id: dto.id });
		} catch (error) {
			next(error);
		}
	});
}
