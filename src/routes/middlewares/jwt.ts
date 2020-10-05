import express from 'express';
import passport from 'passport';
import type { UserModel } from '../../types/models';

export function hasToken(req: express.Request, res: express.Response, next: express.NextFunction) {
	return passport.authenticate('jwt', (error, user: UserModel) => {
		if (error || !user) {
			next(new Error('access_token_failed'));
		}

		req.user = user;
		next();
	})(req, res, next);
}