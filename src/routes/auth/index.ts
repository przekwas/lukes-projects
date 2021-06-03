import { Router } from 'express';
import loginRouter from './login';
import registerRouter from './register';
import validateRouter from './validate';
import botRouter from './bot';

const authRouter = Router();

authRouter.use('/login', loginRouter);
authRouter.use('/register', registerRouter);
authRouter.use('/validate', validateRouter);
authRouter.use('/bot', botRouter);

export default authRouter;