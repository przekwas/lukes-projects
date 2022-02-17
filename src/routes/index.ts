import { Router } from 'express';
import { apiRouter } from './api';
import { authRouter } from './auth';

export const indexRouter = Router();

indexRouter.use('/api', apiRouter);
indexRouter.use('/auth', authRouter);
