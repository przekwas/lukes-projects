import { Router } from 'express';
import { param, body } from 'express-validator';
import { checkToken, isAuth, validateErrorHandler } from '../../../middlewares';
import { sessions } from '../../controllers/workout-buddy';

function workoutBuddySessionsRouter(app: Router) {
	const router = Router();
	app.use('/sessions', router);

	router.route('*').all(checkToken, isAuth);

	/*
        User ID will be pulled from JWT verification and added
        as req.payload via middleware.
    */

	router.get('/user', sessions.getLastFiveForUserController);

	router.post(
		'/user',
		[body('name').notEmpty().withMessage('Name is required')],
		validateErrorHandler,
		sessions.addForUserController
	);

	router.patch(
		'/:id/user',
		[
			param('id').isUUID(4).withMessage('Invalid ID format'),
			body('name').notEmpty().withMessage('Name is required')
		],
		validateErrorHandler,
		sessions.editOneForUserController
	);

	router.delete(
		'/:id/user',
		[param('id').isUUID(4).withMessage('Invalid ID format')],
		validateErrorHandler,
		sessions.destroyOneForUserController
	);

	return router;
}

export { workoutBuddySessionsRouter };
