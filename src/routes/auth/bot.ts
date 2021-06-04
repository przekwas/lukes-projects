import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import * as botServices from '../../services/auth/bot';

const botRouter = Router();

botRouter.post(
	'/generate',
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			discord_name: Joi.string().required(),
			user_id: Joi.string().required(),
			email: Joi.string().required()
		})
	}),
	async (req, res, next) => {
		try {
			const { discord_name, user_id, email } = req.body;
            const result = await botServices.registerRandomCode({ discord_name, user_id, email })
			res.json(result);
		} catch (error) {
			next(error);
		}
	}
);

botRouter.post(
	'/validate',
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			random_code: Joi.number().required(),
			user_id: Joi.string().required()
		})
	}),
	async (req, res, next) => {
		try {
			const { user_id, random_code } = req.body;
            const result = await botServices.validateRandomCode(user_id, random_code)
			res.json(result);
		} catch (error) {
			next(error);
		}
	}
);

export default botRouter;
