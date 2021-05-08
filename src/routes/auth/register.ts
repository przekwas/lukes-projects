import { Router } from 'express';
import { createToken } from '../../utils/tokens';
import { celebrate, Joi, Segments } from 'celebrate';
import * as users from '../../services/auth/users';

const registerRouter = Router();

registerRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			first_name: Joi.string().required(),
			last_name: Joi.string().required(),
			username: Joi.string().required(),
			email: Joi.string().required(),
			password: Joi.string().required()
		})
	}),
	async (req, res, next) => {
		try {
			const userDTO = req.body;
			const { id, username } = await users.register(userDTO);
			const token = createToken({ id, username, role: 1, banned: 0 });
			res.json(token);
		} catch (error) {
			next(error);
		}
	}
);

export default registerRouter;
