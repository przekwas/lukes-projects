import { auth, blogs as checks } from '../middlewares';
import { blogs } from '../../services';
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
		async (req, res, next) => {
			try {
				const id = req.params.blogid;
				const blog = await blogs.getOne(id);
				res.json(blog);
			} catch (error) {
				next(error);
			}
		}
	);

	blogsRouter.get('/', async (req, res, next) => {
		try {
			const blogPosts = await blogs.getAll();
			res.json(blogPosts);
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
		auth.hasToken,
		async (req: ReqUser, res, next) => {
			try {
				const blogDTO = { ...req.body, userid: req.user.userid };
				const id = await blogs.insert(blogDTO);
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
				content: Joi.string().required(),
				userid: Joi.string().required()
			})
		}),
		auth.hasToken,
		checks.isOwner,
		async (req: ReqUser, res, next) => {
			try {
				const blogDTO = { ...req.body, id: req.params.blogid, userid: req.user.userid };
				const result = await blogs.edit(blogDTO);
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
			}),
			[Segments.BODY]: Joi.object().keys({
				userid: Joi.string().required()
			})
		}),
		auth.hasToken,
		checks.isOwner,
		async (req: ReqUser, res, next) => {
			try {
				const id = req.params.blogid;
				const result = await blogs.destroy(id);
				res.json({ message: 'destroyed', result });
			} catch (error) {
				next(error);
			}
		}
	);
}
