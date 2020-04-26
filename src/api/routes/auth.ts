import passport from 'passport';
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { loginUser, registerUser } from '@services/auth';

const route = Router();

export default (app: Router) => {
	app.use('/auth', route);

	route.post(
		'/register',
		celebrate({
			body: Joi.object({
				email: Joi.string().required(),
				password: Joi.string().required(),
				username: Joi.string().required()
			})
		}),
		async (req, res, next) => {
			const userDTO = req.body;
			try {
				const { token, role } = await registerUser(userDTO);
				res.json({ token, role });
			} catch (error) {
				next(error);
			}
		}
	);

	route.post(
		'/login',
		celebrate({
			body: Joi.object({
				email: Joi.string().required(),
				password: Joi.string().required()
			})
		}),

		passport.authenticate('local'),
		async (req, res, next) => {
			const userDTO = req.user;
			try {
				const { token, role } = await loginUser(userDTO);
				res.json({ token, role });
			} catch (error) {
				next(error);
			}
		}
	);

	route.get('/me', passport.authenticate('jwt'), async (req, res, next) => {
		try {
			res.json({ ...req.user });
		} catch (error) {
			next(error);
		}
	});
};
