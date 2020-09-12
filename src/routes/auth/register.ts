import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { authService } from '../../services';

const route = Router();

export default (app: Router) => {
	app.use('/register', route);

	route.post(
		'/',
		celebrate({
			body: Joi.object({
				email: Joi.string().required(),
				password: Joi.string().required()
			})
		}),
		async (req, res, next) => {
			const userDTO = req.body;
			try {
				const token = await authService.register(userDTO);
				res.json({ message: 'user registered', token });
			} catch (error) {
				next(error);
			}
		}
	);
};
