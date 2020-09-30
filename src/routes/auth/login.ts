import passport from 'passport';

import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import type { ReqUser } from 'types/express';

const loginRoute = Router();

export default function (authRouter: Router) {
	authRouter.use('/login', loginRoute);

	loginRoute.post(
		'/',
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				email: Joi.string().required(),
				password: Joi.string().required()
			})
		}),
		passport.authenticate('local'),
		async (req: ReqUser, res, next) => {
			try {
				res.json(req.user);
			} catch (error) {
				next(error);
			}
		}
    );
}
