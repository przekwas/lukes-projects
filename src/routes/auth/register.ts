import { Router } from 'express';
import { createToken } from '../../utils/tokens';
import { celebrate, Joi, Segments } from 'celebrate';
import * as users from '../../services/auth';

const registerRouter = Router();

registerRouter.post(
	'/:id?',
	celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.string().optional()
		}),
		[Segments.BODY]: Joi.object().keys({
			first_name: Joi.string().required(),
			last_name: Joi.string().required(),
			username: Joi.string().required(),
			email: Joi.string().required(),
			password: Joi.string().required(),
			discord_name: Joi.string().optional(),
			validated: Joi.string().optional()
		})
	}),
	async (req, res, next) => {
		try {
			const website = req.params.id;
			const userDTO = req.body;
			const { id, username } = await users.register(userDTO);

			if (website === 'the-bastion-wiki') {
				return res.json({ user_id: id });
			}

			const token = createToken({ id, username, role: 1, banned: 0 });
			res.json(token);
		} catch (error) {
			next(error);
		}
	}
);

export default registerRouter;
