import { Router } from 'express';
import { hipHopRouter } from './hiphop';

export const apiRouter = Router();

apiRouter.use('/hiphop', hipHopRouter);