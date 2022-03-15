import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { mylife } from '@/db/tables';
import { checkToken } from '@/middlewares';

const route = Router();

export function sessionsRouter(app: Router) {
	app.use('/sessions', route);

	// all sessions for a user from jwt
	route.get('/user', checkToken, async (req, res, next) => {
		try {
			const user_id = req.payload.id;
			const result = await mylife.sessions.find({ user_id });
			res.json(result);
		} catch (error) {
			next(error);
		}
	});

	route.post('/', checkToken, async (req, res, next) => {
		try {
			const user_id = req.payload.id;
			const dto = { ...req.body, user_id, id: uuidv4() };
			const result = await mylife.sessions.insert(dto);
			res.json({ ...result, id: dto.id });
		} catch (error) {
			next(error);
		}
	});
}
