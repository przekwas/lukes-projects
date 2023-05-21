import { Router } from 'express';

import { authRouter } from './auth';
import { workoutBuddyRouter } from './workout-buddy';

function indexRouter() {
	const router = Router();

	authRouter(router);
	workoutBuddyRouter(router);

	return router;
}

export { indexRouter };
