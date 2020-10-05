import { Router } from 'express';
import login from './login';
import register from './register';

const authRouter = Router();

export default function (mainRouter: Router) {
	mainRouter.use('/auth', authRouter);

	login(authRouter);
	register(authRouter);
}
