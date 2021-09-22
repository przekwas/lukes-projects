import { Router } from 'express';
import { teamsRouter } from './teams';
import { seasonsRouter } from './seasons';

const pickemRouter = Router();

pickemRouter.use('/teams', teamsRouter);
pickemRouter.use('/seasons', seasonsRouter);

export default pickemRouter;
