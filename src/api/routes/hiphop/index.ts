import { Router } from 'express';
import { param } from 'express-validator';
import { getAllController, getOneController } from '../../controllers/hiphop';
import { validateErrorHandler } from '../../../middlewares';

function hiphopRouter(app: Router) {
	const router = Router();
	app.use('/hiphop', router);

	router.get(
		'/:id',
		[
			param('id')
				.isInt({ min: 1, max: 10 })
				.withMessage('id must be a number between 1 and 10')
		],
		validateErrorHandler,
		getOneController
	);

	router.get('/', getAllController);

	return router;
}

export { hiphopRouter };
