import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { mylife } from '@/db/tables';
import { checkToken, validators } from '@/middlewares';

const route = Router();

export function cardiosRouter(app: Router) {
	app.use('/cardios', route);

	// all cardios for a user from jwt
	route.get('/user', checkToken, async (req, res, next) => {
		try {
			const user_id = req.payload.id;
			const result = await mylife.cardios.find({ user_id });
			res.json(result);
		} catch (error) {
			next(error);
		}
	});

	// all cardios for a user and one session from jwt
	route.get(
		'/user/session',
		validators.sessionId(),
		validators.validatesessionId,
		checkToken,
		async (req, res, next) => {
			try {
				const user_id = req.payload.id;
				const session_id = req.body.session_id;
				const result = await mylife.cardios.find({ user_id, session_id });
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
			console.log(dto);
			const result = await mylife.cardios.insert(dto);
			res.json({ ...result, id: dto.id });
		} catch (error) {
			next(error);
		}
	});
}
