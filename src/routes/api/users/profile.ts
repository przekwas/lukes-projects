import { Router } from 'express';
import { checkToken } from '../../../middlewares';
import * as users from '../../../services/users/profile';

const profileRouter = Router();

profileRouter.get('/', checkToken, async (req, res, next) => {
	try {
		const userid = req.payload.id;
		const profile = await users.getProfile(userid);
		res.json(profile);
	} catch (error) {
		next(error);
	}
});

export default profileRouter;
