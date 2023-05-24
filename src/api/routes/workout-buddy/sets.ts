import { Router } from 'express';
import { param, body } from 'express-validator';
import { checkToken, isAuth, validateErrorHandler } from '../../../middlewares';
import { sets } from '../../controllers/workout-buddy';

function workoutBuddySetsRouter(app: Router) {
	const router = Router();
	app.use('/sets', router);

	router.route('*').all(checkToken, isAuth);

	/*
        User ID will be pulled from JWT verification and added
        as req.payload via middleware.
    */

	router.get('/user', sets.getAllForUser);
	router.get(
		'/user/session/:sessionid',
		[param('sessionid').isUUID(4).withMessage('Invalid ID format')],
		validateErrorHandler,
		sets.getAllForUserSession
	);
	router.post(
		'/user',
		[
			body('name').notEmpty().withMessage('Name is required'),
			body('session_id').isUUID(4).withMessage('Invalid ID format')
		],
		validateErrorHandler,
		sets.addOneForUser
	);
	router.patch(
		'/:sessionid/user',
		[param('sessionid').isUUID(4).withMessage('Invalid ID format')],
		validateErrorHandler,
		sets.editOneForUser
	);
	router.delete(
		'/:sessionid/user',
		[param('sessionid').isUUID(4).withMessage('Invalid ID format')],
		validateErrorHandler,
		sets.destroyOneForUser
	);

	return router;
}

export { workoutBuddySetsRouter };
