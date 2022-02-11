import { Router } from 'express';
import { checkToken } from '../../middlewares';

export const validateRouter = Router();

validateRouter.get('/', checkToken, async (req, res, next) => {
	try {
		res.json({ message: 'ok' });
	} catch (error) {
		next(error);
	}
});