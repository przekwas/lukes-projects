import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import db from '@db';

const route = Router();

export default (app: Router) => {
	app.use('/enchants', route);

	route.get(
		'/:id?',
		celebrate({
			params: Joi.object({
				id: Joi.number()
			})
		}),
		async (req, res, next) => {
			const id = Number(req.params.id);
			if (id) {
				try {
					const enchant = await db.enchanter.enchants.one(id);
					res.json(enchant);
				} catch (error) {
					next(error);
				}
			} else {
				try {
					const enchants = await db.enchanter.enchants.all();
					res.json(enchants);
				} catch (error) {
					next(error);
				}
			}
		}
	);

	route.post(
		'/new',
		celebrate({
			body: Joi.object({
				enchant: Joi.string().required(),
				item: Joi.string().required(),
				effect: Joi.string().required(),
				stat: Joi.string().required(),
				rod: Joi.string().required()
			})
		}),
		async (req, res, next) => {
			const enchant = req.body;
			console.log(enchant);
			try {
				const { insertId } = await db.enchanter.enchants.insert(enchant);
				res.json({ insertId, msg: 'new enchant inserted' });
			} catch (error) {
				next(error);
			}
		}
	);
};
