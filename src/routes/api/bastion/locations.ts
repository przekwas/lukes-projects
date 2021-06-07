import { Router } from 'express';
import { checkToken } from '../../../middlewares';
import { celebrate, Joi, Segments } from 'celebrate';
import * as locations from '../../../services/bastion/locations';

const locationsRouter = Router();

locationsRouter
	.route('*')
	.post(
		checkToken,
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				name: Joi.string().required(),
				content: Joi.string().required(),
				region: Joi.string().optional(),
				avatar_url: Joi.string().optional()
			})
		})
	)
	.put(
		checkToken,
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				name: Joi.string().optional(),
				content: Joi.string().optional(),
				region: Joi.string().optional(),
				avatar_url: Joi.string().optional()
			})
		})
	)
	.delete(checkToken);

locationsRouter.get('/', async (req, res, next) => {
	try {
		const result = await locations.getAll();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

locationsRouter.get('/:location_id', async (req, res, next) => {
	try {
		const location_id = req.params.location_id;
		const result = await locations.getOne(location_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

locationsRouter.post('/', async (req, res, next) => {
	try {
		const eventDTO = req.body;
		eventDTO.user_id = req.payload.id;
		const result = await locations.create(eventDTO);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

locationsRouter.put('/:location_id', async (req, res, next) => {
	try {
		const eventDTO = req.body;
		const location_id = req.params.location_id;
		eventDTO.modified_by = req.payload.id;
		const result = await locations.editOne(eventDTO, location_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

locationsRouter.delete('/:location_id', async (req, res, next) => {
	try {
		const location_id = req.params.location_id;
		const result = await locations.deleteOne(location_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

export default locationsRouter;
