import { Router } from 'express';
import login from './login';

const authRouter = Router();

export default function (mainRouter: Router) {
	mainRouter.use('/auth', authRouter);

	login(authRouter);
}
