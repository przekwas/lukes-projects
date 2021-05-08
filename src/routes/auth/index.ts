import { Router } from 'express';
import loginRouter from './login';
import registerRouter from './register';
import validateRouter from './validate';

const authRouter = Router();

authRouter.use('/login', loginRouter);
authRouter.use('/register', registerRouter);
authRouter.use('/validate', validateRouter);

export default authRouter;