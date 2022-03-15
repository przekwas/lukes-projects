import { Router } from 'express';
import { hiphop } from '@/db/tables';

const route = Router();

export function hipHopRouter(app: Router) {
	app.use('/hiphop', route);

	route.get('/:id', async (req, res, next) => {
		try {
			const id = req.params.id;
			const [result] = await hiphop.one(id);
			res.json(result);
		} catch (error) {
			next(error);
		}
	});

	route.get('/', async (req, res, next) => {
		try {
			const result = await hiphop.all();
			res.json(result);
		} catch (error) {
			next(error);
		}
	});
}