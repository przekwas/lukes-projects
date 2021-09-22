import { Router } from 'express';
import { checkToken, checkPickemRole } from '../../../middlewares';
import { celebrate, Joi, Segments } from 'celebrate';
import * as seasons from '../../../services/pickem/seasons';

export const seasonsRouter = Router();

seasonsRouter.route('*').post(
	checkToken,
	checkPickemRole,
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			num: Joi.number().required()
		})
	})
);

seasonsRouter.post('/', async (req, res, next) => {
	try {
		const num = req.body.num;
		const result = await seasons.create({ num });
		res.json(result);
	} catch (error) {
		next(error);
	}
});
