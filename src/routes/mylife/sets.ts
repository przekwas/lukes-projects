import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { mylife } from '@/db/tables';
import { checkToken, validators } from '@/middlewares';

const route = Router();

export function setsRouter(app: Router) {
	app.use('/sets', route);

	// all sets for a user from jwt
	route.get('/user', checkToken, async (req, res, next) => {
		try {
			const user_id = req.payload.id;
			const result = await mylife.sets.find({ user_id });
			res.json(result);
		} catch (error) {
			next(error);
		}
	});

	// all sets for a user and one session from jwt
	route.get(
		'/user/session',
		checkToken,
		validators.uuidValidator('id'),
		validators.validateRequest,
		async (req, res, next) => {
			try {
				const user_id = req.payload.id;
				const session_id = req.query.id.toString();
				const result = await mylife.sets.find({ user_id, session_id }, 'created_at');
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
			const result = await mylife.sets.insert(dto);
			res.json({ ...result, id: dto.id });
		} catch (error) {
			next(error);
		}
	});
}
