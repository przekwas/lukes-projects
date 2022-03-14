import passport from 'passport';
import type { Request, Response, NextFunction } from 'express';

export function handleLogin(req: Request, res: Response, next: NextFunction) {
	passport.authenticate('local', { session: false }, (error, user, info) => {
		if (error) {
			return next(error);
		}

		if (info) {
			return res.status(401).json({ message: info.message.toLowerCase() });
		}

		if (!user) {
			return res.status(401).json({ message: 'redirect to login' });
		}

		req.currentUser = user;
		next();
	})(req, res, next);
}

export function checkToken(req: Request, res: Response, next: NextFunction) {
	passport.authenticate('jwt', { session: false }, (error, user, info) => {
		if (error) {
			return next(error);
		}

		if (info) {
			return res.status(401).json({ message: info.message.toLowerCase() });
		}

		if (!user) {
			return res.status(401).json({ message: 'redirect to login' });
		}

		req.payload = user;
		next();
	})(req, res, next);
}


