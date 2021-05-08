import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { createToken } from '../../utils/tokens';
import { handleLogin } from '../../middlewares';

const loginRouter = Router();

loginRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			email: Joi.string().required(),
			password: Joi.string().required()
		})
	}),
	handleLogin,
	async (req, res, next) => {
		try {
			const { id, username, role, banned } = req.currentUser;
			const token = createToken({ id, username, role, banned });
			res.json(token);
		} catch (error) {
			next(error);
		}
	}
);

export default loginRouter;
