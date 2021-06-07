import { Router } from 'express';
import { checkToken } from '../../../middlewares';
import { celebrate, Joi, Segments } from 'celebrate';
import * as events from '../../../services/bastion/events';

const eventsRouter = Router();

eventsRouter
	.route('*')
	.post(
		checkToken,
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				name: Joi.string().required(),
				content: Joi.string().required(),
				time: Joi.string().optional(),
				avatar_url: Joi.string().optional(),
				location_id: Joi.string().optional()
			})
		})
	)
	.put(
		checkToken,
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				name: Joi.string().optional(),
				content: Joi.string().optional(),
				time: Joi.string().optional(),
				avatar_url: Joi.string().optional(),
				location_id: Joi.string().optional()
			})
		})
	)
	.delete(checkToken);

eventsRouter.get('/', async (req, res, next) => {
	try {
		const result = await events.getAll();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

eventsRouter.get('/:event_id', async (req, res, next) => {
	try {
		const event_id = req.params.event_id;
		const result = await events.getOne(event_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

eventsRouter.post('/', async (req, res, next) => {
	try {
		const eventDTO = req.body;
		eventDTO.user_id = req.payload.id;
		const result = await events.create(eventDTO);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

eventsRouter.put('/:event_id', async (req, res, next) => {
	try {
		const eventDTO = req.body;
		const event_id = req.params.event_id;
		eventDTO.modified_by = req.payload.id;
		const result = await events.editOne(eventDTO, event_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

eventsRouter.delete('/:event_id', async (req, res, next) => {
	try {
		const event_id = req.params.event_id;
		const result = await events.deleteOne(event_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

export default eventsRouter;
