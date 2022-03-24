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

	// all results for a user from jwt on a given week
	route.get('/user/weekly', checkToken, async (req, res, next) => {
		try {
			const user_id = req.payload.id;
			const weights = await mylife.results.weeklyWeights(user_id);
			const cardio = await mylife.results.weeklyCardio(user_id);
			res.json({
				weights,
				cardio
			});
		} catch (error) {
			next(error);
		}
	});

	// all cardio and exercise stats for home page
	route.get('/totals', async (req, res, next) => {
		try {
			const [cardio] = await mylife.results.totalCardioStats();
			const [exercise] = await mylife.results.totalExerciseStats();
			const [total_sets] = await mylife.results.totalSetsStats();
			res.json({
				cardio,
				exercise: { ...exercise, ...total_sets }
			});
		} catch (error) {
			next(error);
		}
	});
}
