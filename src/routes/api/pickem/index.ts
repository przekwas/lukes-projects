import { Router } from 'express';
import teamsRouter from './teams';

const pickemRouter = Router();

pickemRouter.use('/teams', teamsRouter);

export default pickemRouter;