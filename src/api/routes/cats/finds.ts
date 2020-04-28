import { Router } from 'express';
import db from '@db';

const route = Router();

export default (app: Router) => {
	app.use('/finds', route);

	route.get('/:id?', async (req, res, next) => {
		const id = Number(req.params.id);
		if (id) {
			try {
				const cat = await db.cats.finds.one(id);
				res.json(cat);
			} catch (error) {
				next(error);
			}
		} else {
			try {
				const cats = await db.cats.finds.all();
				res.json(cats);
			} catch (error) {
				next(error);
			}
		}
	});

	route.post('/new', async (req, res, next) => {
		const cat = req.body;
		try {
			const { insertId } = await db.cats.finds.insert(cat);
			res.json({ insertId, msg: 'new cat inserted' });
		} catch (error) {
			next(error);
		}
	});

	route.put('/edit/:id', async (req, res, next) => {
		const id = Number(req.params.id);
		const cat = req.body;
		try {
			const { affectedRows } = await db.cats.finds.update(cat, id);
			res.json({ affectedRows, msg: 'cat edited' });
		} catch (error) {
			next(error);
		}
	});

	route.delete('/:id', async (req, res, next) => {
		const id = Number(req.params.id);
		try {
			const { affectedRows } = await db.cats.finds.destroy(id);
			res.json({ affectedRows, msg: 'cat deleted' });
		} catch (error) {
			next(error);
		}
	});
};
