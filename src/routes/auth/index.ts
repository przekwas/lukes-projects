import { Router } from 'express';
import { loginRouter } from './login';
import { validateRouter } from './validate';

export const authRouter = Router();

authRouter.use('/login', loginRouter);
authRouter.use('/validate', validateRouter);