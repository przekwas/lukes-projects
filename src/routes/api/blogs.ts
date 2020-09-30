import { Router } from 'express';

const blogsRouter = Router();

export default function (apiRouter: Router) {
	apiRouter.use('/blogs', blogsRouter);

	blogsRouter.get('/', (req, res) => {
		res.json('all blogs');
	});
}
