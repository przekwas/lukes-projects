import { Router } from 'express';

import { authRouter } from './auth';
import { hiphopRouter } from './hiphop';
import { workoutBuddyRouter } from './workout-buddy';

function indexRouter() {
	const router = Router();

	authRouter(router);
	hiphopRouter(router);
	workoutBuddyRouter(router);

	return router;
}

export { indexRouter };
