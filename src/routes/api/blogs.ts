import * as middlewares from '../middlewares';
import * as services from '../../services';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import type { ReqUser } from '../../types/express';

const blogsRouter = Router();

export default function (apiRouter: Router) {
	apiRouter.use('/blogs', blogsRouter);

	blogsRouter.get(
		'/:blogid',
		celebrate({
			[Segments.PARAMS]: Joi.object().keys({
				blogid: Joi.string().required()
			})
		}),
		async (req: ReqUser, res, next) => {
			try {
				const id = req.params.blogid;
				const blog = await services.blogs.getOne(id);
				res.json(blog);
			} catch (error) {
				next(error);
			}
		}
	);

	blogsRouter.get('/', async (req, res, next) => {
		try {
			const blogs = await services.blogs.getAll();
			res.json(blogs);
		} catch (error) {
			next(error);
		}
	});

	blogsRouter.post(
		'/',
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				title: Joi.string().required(),
				content: Joi.string().required()
			})
		}),
		middlewares.auth.hasToken,
		async (req: ReqUser, res, next) => {
			try {
				const blogDTO = { ...req.body, userid: req.user.userid };
				const id = await services.blogs.insert(blogDTO);
				res.json({ id, message: 'inserted' });
			} catch (error) {
				next(error);
			}
		}
	);

	blogsRouter.put(
		'/:blogid',
		celebrate({
			[Segments.PARAMS]: Joi.object().keys({
				blogid: Joi.string().required()
			}),
			[Segments.BODY]: Joi.object().keys({
				title: Joi.string().required(),
				content: Joi.string().required()
			})
		}),
		middlewares.auth.hasToken,
		async (req: ReqUser, res, next) => {
			try {
				const blogDTO = { ...req.body, id: req.params.blogid, userid: req.user.userid };
				const result = await services.blogs.edit(blogDTO);
				res.json({ message: 'edited', result });
			} catch (error) {
				next(error);
			}
		}
	);

	blogsRouter.delete(
		'/:blogid',
		celebrate({
			[Segments.PARAMS]: Joi.object().keys({
				blogid: Joi.string().required()
			})
		}),
		middlewares.auth.hasToken,
		async (req: ReqUser, res, next) => {
			try {
				const id = req.params.blogid;
				const result = await services.blogs.destroy(id);
				res.json({ message: 'destroyed', result });
			} catch (error) {
				next(error);
			}
		}
	);
}
