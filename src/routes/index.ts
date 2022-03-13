import { Router } from 'express';
import { authRouter } from './auth';
import { tokensRouter } from './tokens';

export function indexRouter() {
	const app = Router();
	authRouter(app);
	tokensRouter(app);

    return app;
}
