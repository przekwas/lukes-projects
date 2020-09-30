import { Router } from 'express';
import blogs from './blogs';

const apiRouter = Router();

export default function (mainRoutes: Router) {
	mainRoutes.use('/api', apiRouter);

	blogs(apiRouter);
}