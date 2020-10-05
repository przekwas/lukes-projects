import { auth } from '../../services';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const registerRoute = Router();

export default function (authRouter: Router) {
	authRouter.use('/register', registerRoute);

	registerRoute.post(
		'/',
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				username: Joi.string().required(),
				email: Joi.string().required(),
				password: Joi.string().required()
			})
		}),
		async (req, res, next) => {
			try {
				const userDTO = { ...req.body };
				const result = await auth.register(userDTO);
				res.json(result);
			} catch (error) {
				next(error);
			}
		}
	);
}
