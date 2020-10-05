import passport from 'passport';
import * as services from '../../services'
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import type { ReqUser } from '../../types/express';

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
				const result = await services.auth.login(req.user);
				res.json(result);
			} catch (error) {
				next(error);
			}
		}
    );
}
