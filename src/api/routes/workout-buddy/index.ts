import { Router } from 'express';
import { workoutBuddySessionsRouter } from './sessions';
import { workoutBuddySetsRouter } from './sets';

function workoutBuddyRouter(app: Router) {
	const router = Router();
	app.use('/workoutbuddy', router);

	workoutBuddySessionsRouter(router);
	workoutBuddySetsRouter(router);

	return router;
}

export { workoutBuddyRouter };
