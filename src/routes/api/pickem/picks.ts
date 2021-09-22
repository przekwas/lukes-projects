import { Router } from 'express';
import * as picks from '../../../services/pickem/picks';

const picksRouter = Router();

picksRouter.get('/:week_id', async (req, res, next) => {
	try {
		const week_id = req.params.week_id;
		const result = await picks.getAllForWeek({ week_id });
		res.json(result);
	} catch (error) {
		next(error);
	}
});

export default picksRouter;
