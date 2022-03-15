import { Router } from 'express';
import { authRouter } from './auth';
import { tokensRouter } from './tokens';
import { hipHopRouter } from './hiphop';
import { myLifeRouter } from './mylife';

export function indexRouter() {
	const app = Router();
	authRouter(app);
	tokensRouter(app);
	hipHopRouter(app);
	myLifeRouter(app);
	return app;
}
