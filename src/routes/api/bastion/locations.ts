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

locationsRouter.get('/:character_id', async (req, res, next) => {
	try {
		const character_id = req.params.character_id;
		const result = await locations.getOne(character_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

locationsRouter.post('/', async (req, res, next) => {
	try {
		const characterDTO = req.body;
		characterDTO.user_id = req.payload.id;
		const result = await locations.create(characterDTO);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

locationsRouter.put('/:character_id', async (req, res, next) => {
	try {
		const characterDTO = req.body;
		const character_id = req.params.character_id;
		characterDTO.modified_by = req.payload.id;
		const result = await locations.editOne(characterDTO, character_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

locationsRouter.delete('/:character_id', async (req, res, next) => {
	try {
		const character_id = req.params.character_id;
		const result = await locations.deleteOne(character_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

export default locationsRouter;
