import { Router } from 'express';
import { mylife } from '@/db/tables';
import { checkToken, validators } from '@/middlewares';

const route = Router();

export function resultsRouter(app: Router) {
	app.use('/results', route);

	// all results for a user from jwt on a given day
	route.get('/user/today', checkToken, async (req, res, next) => {
		try {
			const user_id = req.payload.id;
			const weights = await mylife.results.dailyWeights(user_id);
			const cardio = await mylife.results.dailyCardio(user_id);
			res.json({
				weights,
				cardio
			});
		} catch (error) {
			next(error);
		}
	});
}
