import { Router } from 'express';
import { checkToken } from '../../../middlewares';
import { celebrate, Joi, Segments } from 'celebrate';
import * as notes from '../../../services/bastion/notes';

const notesRouter = Router();

notesRouter
	.route('*')
	.post(
		checkToken,
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				name: Joi.string().required(),
				content: Joi.string().required()
			})
		})
	)
	.put(
		checkToken,
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				name: Joi.string().optional(),
				content: Joi.string().optional()
			})
		})
	)
	.delete(checkToken);

notesRouter.get('/', async (req, res, next) => {
	try {
		const result = await notes.getAll();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

notesRouter.get('/:note_id', async (req, res, next) => {
	try {
		const note_id = req.params.note_id;
		const result = await notes.getOne(note_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

notesRouter.post('/', async (req, res, next) => {
	try {
		const noteDTO = req.body;
		noteDTO.user_id = req.payload.id;
		const result = await notes.create(noteDTO);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

notesRouter.put('/:note_id', async (req, res, next) => {
	try {
		const noteDTO = req.body;
		const note_id = req.params.note_id;
		noteDTO.modified_by = req.payload.id;
		const result = await notes.editOne(noteDTO, note_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

notesRouter.delete('/:note_id', async (req, res, next) => {
	try {
		const note_id = req.params.note_id;
		const result = await notes.deleteOne(note_id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

export default notesRouter;
