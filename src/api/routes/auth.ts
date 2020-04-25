import passport from 'passport';
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import logger from '@logger';

const route = Router();

export default (app: Router) => {
	app.use('/auth', route);

	route.post(
		'/register',
		celebrate({
			body: Joi.object({
				email: Joi.string().required(),
				password: Joi.string().required()
			})
		}),
		async (req, res, next) => {
			try {
				res.json({ msg: 'register' });
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
			try {
				res.json({ msg: 'login' });
			} catch (error) {
				next(error);
			}
		}
	);
};
