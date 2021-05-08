import { Router } from 'express';
import chirpsRouter from './chirps';

const authRouter = Router();

authRouter.use('/chirps', chirpsRouter);

export default authRouter;