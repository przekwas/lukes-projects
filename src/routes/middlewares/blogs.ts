import express from 'express';
import type { UserModel } from '../../types/models';
import type { ReqUser } from '../../types/express';

export function isOwner(req: ReqUser, res: express.Response, next: express.NextFunction) {
	if (req.user.userid !== req.body.userid) {
		res.status(401).json({ message: 'you are not the blog owner' });
	} else {
		next();
	}
}
