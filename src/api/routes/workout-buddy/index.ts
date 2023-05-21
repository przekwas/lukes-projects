import { Router } from 'express';
import { checkToken, isAuth } from '../../../middlewares';
import { getAllSessionsForUserController } from '../../controllers/workout-buddy';

function workoutBuddyRouter(app: Router) {
	const router = Router();
	app.use('/workoutbuddy', router);

	// gets all sessions for a user
	// userid pulled from jwt
	router.get('/sessions/user', checkToken, isAuth, getAllSessionsForUserController);

	return router;
}

export { workoutBuddyRouter };
