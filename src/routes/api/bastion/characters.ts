import { Router } from 'express';
import { checkToken } from '../../../middlewares';
import { celebrate, Joi, Segments } from 'celebrate';
import * as characters from '../../../services/bastion/characters';

const characterRouter = Router();

characterRouter
	.route('*')
	.post(
		checkToken,
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				name: Joi.string().required(),
				content: Joi.string().required(),
				race: Joi.string().optional(),
				class: Joi.string().optional(),
				misc: Joi.string().optional()
			})
		})
	)
	.put(
		checkToken,
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				name: Joi.string().optional(),
				content: Joi.string().optional(),
				race: Joi.string().optional(),
				class: Joi.string().optional(),
				misc: Joi.string().optional()
			})
		})
	)
	.delete(checkToken);

characterRouter.get('/', async (req, res, next) => {
	try {
		const result = await characters.getAll();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

characterRouter.get('/:character_id', async (req, res, next) => {
	try {
		const character_id = req.params.character_id;
		const result = await characters.getOne(character_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

characterRouter.post('/', async (req, res, next) => {
	try {
		const characterDTO = req.body;
		characterDTO.user_id = req.payload.id;
		const result = await characters.create(characterDTO);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

characterRouter.put('/:character_id', async (req, res, next) => {
	try {
		const characterDTO = req.body;
		const character_id = req.params.character_id;
		characterDTO.modified_by = req.payload.id;
		const result = await characters.editOne(characterDTO, character_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

characterRouter.delete('/:character_id', async (req, res, next) => {
	try {
		const character_id = req.params.character_id;
		const result = await characters.deleteOne(character_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

export default characterRouter;
