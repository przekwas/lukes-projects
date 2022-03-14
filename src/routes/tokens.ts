import { Router } from 'express';
import { checkToken } from '@/middlewares';

const route = Router();

export function tokensRouter(app: Router) {
	app.use('/tokens', route);

	route.get('/validate', checkToken, async (req, res, next) => {
		try {
			res.json({ message: 'ok' });
		} catch (error) {
			next(error);
		}
	});
}


