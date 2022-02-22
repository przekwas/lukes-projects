import { Router } from 'express';
import { hipHopRouter } from './hiphop';
import { myLifeRouter } from './my-life';

export const apiRouter = Router();

apiRouter.use('/hiphop', hipHopRouter);
apiRouter.use('/mylife', myLifeRouter);