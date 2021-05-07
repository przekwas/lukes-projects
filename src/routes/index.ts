import { Router } from 'express';
import authRouter from './auth';
import apiRouter from './api';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/api', apiRouter);

export default indexRouter;
