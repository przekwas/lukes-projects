import { Router } from 'express';
import chirperRouter from './chirper';
import bastionRouter from './bastion';

const authRouter = Router();

authRouter.use('/chirper', chirperRouter);
authRouter.use('/bastion', bastionRouter);

export default authRouter;
