import { Router } from 'express';
import { checkToken } from '../../middlewares';

const validateRouter = Router();

validateRouter.get('/', checkToken, async (req, res, next) => {
	try {
		res.json({ message: 'ok' });
	} catch (error) {
		next(error);
	}
});

export default validateRouter;
