import { Router } from 'express';
import { authRouter } from './auth';

export const indexRouter = Router();

indexRouter.use('/auth', authRouter);