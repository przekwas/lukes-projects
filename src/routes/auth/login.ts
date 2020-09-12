import passport from 'passport';
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { authService } from '../../services';
import { ReqUser } from 'types/express';

const route = Router();

export default (app: Router) => {
	app.use('/login', route);

	route.post(
		'/',
		celebrate({
			body: Joi.object({
				email: Joi.string().required(),
				password: Joi.string().required()
			})
        }),
        passport.authenticate('local'),
		async (req: ReqUser, res, next) => {
            const userDTO = req.user;
			try {
				const token = await authService.login(userDTO);
				res.json({ message: 'login successful', token });
			} catch (error) {
				next(error);
			}
		}
	);
};
