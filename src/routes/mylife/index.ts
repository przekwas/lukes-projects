import { Router } from 'express';
import { sessionsRouter } from './sessions';
import { cardiosRouter } from './cardios';
import { setsRouter } from './sets';
import { exercisesRouter } from './exercises';
import { resultsRouter } from './results';

export function myLifeRouter(app: Router) {
	const route = Router();
	app.use('/mylife', route);

	sessionsRouter(route);
	cardiosRouter(route);
	setsRouter(route);
	exercisesRouter(route);
	resultsRouter(route);
    
	return route;
}
