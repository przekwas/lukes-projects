import { Router } from 'express';
import { checkToken } from '../../../middlewares';
import { celebrate, Joi, Segments } from 'celebrate';
import * as chirps from '../../../services/chirper/chirps';

const chirpsRouter = Router();

chirpsRouter
	.route('*')
	.post(
		checkToken,
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				content: Joi.string().required(),
				location: Joi.string().optional()
			})
		})
	)
	.put(
		checkToken,
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				content: Joi.string().required(),
				location: Joi.string().optional()
			})
		})
	)
	.delete(checkToken);

chirpsRouter.get('/', async (req, res, next) => {
	try {
		const result = await chirps.getAll();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

chirpsRouter.get('/:chirp_id', async (req, res, next) => {
	try {
		const chirp_id = req.params.chirp_id;
		const result = await chirps.getOne(chirp_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

chirpsRouter.post('/', async (req, res, next) => {
	try {
		const chirpDTO = req.body;
		chirpDTO.user_id = req.payload.id;
		const result = await chirps.create(chirpDTO);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

chirpsRouter.put('/:chirp_id', async (req, res, next) => {
	try {
		const chirpDTO = req.body;
		const chirp_id = req.params.chirp_id;
		const user_id = req.payload.id;
		const result = await chirps.editOne(chirpDTO, chirp_id, user_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

chirpsRouter.delete('/:chirp_id', async (req, res, next) => {
	try {
		const chirp_id = req.params.chirp_id;
		const user_id = req.payload.id;
		const result = await chirps.deleteOne(chirp_id, user_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

export default chirpsRouter;
