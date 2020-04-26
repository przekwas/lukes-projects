import passport from 'passport';
import { Router } from 'express';

const route = Router();

export default (app: Router) => {
	app.use('/test', route);

	route.get('/', passport.authenticate('jwt'), (req, res) => res.json('test'));
};
