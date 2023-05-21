import passport from 'passport';
import type { Request, Response, NextFunction } from 'express';

function authMiddleware(strategy: string) {
	return (req: Request, res: Response, next: NextFunction) => {
		passport.authenticate(
			strategy,
			{ session: false },
			(error: Error | null, user: any, info: { message: string } | undefined) => {
				if (error) {
					return next(error);
				}

				if (info) {
					return res.status(401).json({ message: info.message.toLowerCase() });
				}

				if (strategy === 'local') {
					req.currentUser = user;
				} else {
					req.payload = user;
				}

				next();
			}
		)(req, res, next);
	};
}

export const handleLogin = authMiddleware('local');
export const checkToken = authMiddleware('jwt');