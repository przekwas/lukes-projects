import express from 'express';
import { Table } from './table-crud';

export interface ITableRouterOptions {
	canRead?: express.RequestHandler;
	canWrite?: express.RequestHandler;
	canEdit?: express.RequestHandler;
	canDelete?: express.RequestHandler;
}

const noAuthRequired: express.RequestHandler = (req, res, next) => next();

export class TableRouter<T> {
	public Router: express.Router = express.Router();

	constructor(table: Table<T>, options?: ITableRouterOptions) {
		options = options || {};

		if (!options.canRead) {
			options.canRead = noAuthRequired;
		}

		if (!options.canWrite) {
			options.canWrite = noAuthRequired;
		}

		if (!options.canEdit) {
			options.canEdit = noAuthRequired;
		}

		if (!options.canDelete) {
			options.canDelete = noAuthRequired;
		}

		// find
		this.Router.get('/find', options.canRead, async (req, res, next) => {
			try {
				const query = req.query;
				const results = await table.find(query as any);
				res.json(results);
			} catch (error) {
				next(error);
			}
		});

		// get one
		this.Router.get('/:id', options.canRead, async (req, res, next) => {
			try {
				const id = Number(req.params.id);
				const [results] = await table.one(id);
				res.json(results);
			} catch (error) {
				next(error);
			}
		});

		// get all
		this.Router.get('/', options.canRead, async (req, res, next) => {
			try {
				const results = await table.all();
				res.json(results);
			} catch (error) {
				next(error);
			}
		});

		// add
		this.Router.post('/', options.canWrite, async (req, res, next) => {
			try {
				const dto = req.body;
				const results = await table.insert(dto);
				res.json(results);
			} catch (error) {
				next(error);
			}
		});

		// edit
		this.Router.put('/:id', options.canEdit, async (req, res, next) => {
			try {
				const id = Number(req.params.id);
				const dto = req.body;
				const results = await table.update(id, dto);
				res.json(results);
			} catch (error) {
				next(error);
			}
		});

		// delete
		this.Router.put('/:id', options.canDelete, async (req, res, next) => {
			try {
				const id = Number(req.params.id);
				const results = await table.destroy(id);
				res.json(results);
			} catch (error) {
				next(error);
			}
		});
	}
}
