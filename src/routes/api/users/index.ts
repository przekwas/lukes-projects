import { Router } from 'express';
import profileRouter from './profile';

const apiRouter = Router();

apiRouter.use('/profile', profileRouter);

export default apiRouter;