import db from '@db';
import passport from 'passport';
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import type { ReqUser } from '@interfaces/express';

const route = Router();

export default (app: Router) => {
	app.use(route);

	route.get('/all', async (req, res, next) => {
		try {
			const blogs = await db.blogs.posts.all();
			res.json(blogs);
		} catch (error) {
			next(error);
		}
	});

	route.get(
		'/one/:id',
		celebrate({
			params: Joi.object({
				id: Joi.number()
			})
		}),
		async (req, res, next) => {
			const id = Number(req.params.id);

			try {
				const [blog] = await db.blogs.posts.one(id);
				res.json(blog);
			} catch (error) {
				next(error);
			}
		}
	);

	route.post(
		'/new',
		passport.authenticate('jwt'),
		celebrate({
			body: Joi.object({
				title: Joi.string().required(),
				content: Joi.string().required()
			})
		}),
		async (req: ReqUser, res, next) => {
			const blogDTO = req.body;
			blogDTO.userid = req.user.id;

			try {
				const { insertId } = await db.blogs.posts.insert(blogDTO);
				res.json({ insertId, msg: 'blog inserted' });
			} catch (error) {
				next(error);
			}
		}
	);

	route.put(
		'/edit/:id',
		passport.authenticate('jwt'),
		celebrate({
			params: Joi.object({
				id: Joi.number()
			}),
			body: Joi.object({
				title: Joi.string(),
				content: Joi.string()
			})
		}),
		async (req, res, next) => {
			const id = Number(req.params.id);
			const blogDTO = req.body;

			try {
				const { affectedRows } = await db.blogs.posts.update(blogDTO, id);
				res.json({ affectedRows, msg: 'blog edited' });
			} catch (error) {
				next(error);
			}
		}
	);

	route.delete(
		'/destroy/:id',
		passport.authenticate('jwt'),
		celebrate({
			params: Joi.object({
				id: Joi.number()
			})
		}),
		async (req, res, next) => {
			const id = Number(req.params.id);

			try {
				const { affectedRows } = await db.blogs.posts.destroy(id);
				res.json({ affectedRows, msg: 'blog deleted' });
			} catch (error) {
				next(error);
			}
		}
	);
};
