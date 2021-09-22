import { Router } from 'express';
import * as teams from '../../../services/pickem/teams';

const teamsRouter = Router();

teamsRouter.get('/', async (req, res, next) => {
	try {
		const result = await teams.getAll();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

teamsRouter.get('/:team_id', async (req, res, next) => {
	try {
		const team_id = req.params.team_id;
		const result = await teams.getOne(team_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

export default teamsRouter;
