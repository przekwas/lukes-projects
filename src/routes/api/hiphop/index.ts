import { Router } from 'express';
import { db } from '@/db';
import { isAdmin } from '@/middlewares';

export const hipHopRouter = Router();

hipHopRouter.route('*').post(isAdmin).put(isAdmin).delete(isAdmin);

hipHopRouter.get('/find', async (req, res, next) => {
	try {
		const query = req.query;
		const results = await db.hiphop.find(query);
		res.json(results);
	} catch (error) {
		next(error);
	}
});

// get one
hipHopRouter.get('/:id', async (req, res, next) => {
	try {
		const id = Number(req.params.id);
		const [results] = await db.hiphop.one(id);
		res.json(results);
	} catch (error) {
		next(error);
	}
});

// get all
hipHopRouter.get('/', async (req, res, next) => {
	try {
		const results = await db.hiphop.all();
		res.json(results);
	} catch (error) {
		next(error);
	}
});

// add
hipHopRouter.post('/', async (req, res, next) => {
	try {
		const dto = req.body;
		const results = await db.hiphop.insert(dto);
		res.json(results);
	} catch (error) {
		next(error);
	}
});

// edit
hipHopRouter.put('/:id', async (req, res, next) => {
	try {
		const id = Number(req.params.id);
		const dto = req.body;
		const results = await db.hiphop.update(id, dto);
		res.json(results);
	} catch (error) {
		next(error);
	}
});

// delete
hipHopRouter.put('/:id', async (req, res, next) => {
	try {
		const id = Number(req.params.id);
		const results = await db.hiphop.destroy(id);
		res.json(results);
	} catch (error) {
		next(error);
	}
});
