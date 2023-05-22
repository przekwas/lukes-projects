import { Router } from 'express';
import { param, body } from 'express-validator';
import { checkToken, isAuth, validateErrorHandler } from '../../../middlewares';
import {
	getAllSessionsForUserController,
	addSessionForUserController,
	editOneSessionForUserController,
	destroyOneSessionForUserController
} from '../../controllers/workout-buddy';

function workoutBuddyRouter(app: Router) {
	const router = Router();
	app.use('/workoutbuddy', router);

	router.route('*').all(checkToken, isAuth);

	// user id will be verified and pulled from jwt access
	router.get('/sessions/user', getAllSessionsForUserController);

	router.post(
		'/sessions/user',
		[body('name').notEmpty().withMessage('Name is required')],
		validateErrorHandler,
		addSessionForUserController
	);

	router.patch(
		'/sessions/:id/user',
		[
			param('id').isUUID(4).withMessage('Invalid ID format'),
			body('name').notEmpty().withMessage('Name is required')
		],
		validateErrorHandler,
		editOneSessionForUserController
	);
	router.delete('/sessions/:id/user', destroyOneSessionForUserController);

	return router;
}

export { workoutBuddyRouter };
