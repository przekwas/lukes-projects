import { Router } from 'express';
import chirperRouter from './chirper';
import bastionRouter from './bastion';
import usersRouter from './users';

const authRouter = Router();

authRouter.use('/chirper', chirperRouter);
authRouter.use('/bastion', bastionRouter);
authRouter.use('/users', usersRouter);

export default authRouter;
