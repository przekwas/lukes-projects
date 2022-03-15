import { Router } from 'express';
import { users } from '@/db/tables';
import { createToken } from '@/utils';
import { handleLogin } from '@/middlewares';

const route = Router();

export function authRouter(app: Router) {
	app.use('/auth', route);

	route.post('/register', async (req, res, next) => {
		try {
			const dto = { ...req.body };
			const { id, email } = await users.register(dto);
			const token = createToken({ id, email, role: 0, banned: 0 });
			res.json({ message: 'register success', token });
		} catch (error) {
			next(error);
		}
	});

	route.post('/login', handleLogin, async (req, res, next) => {
		try {
			const { id, email, role, banned } = req.currentUser;
			const token = createToken({ id, email, role, banned });
			res.json({ message: 'login success', token });
		} catch (error) {
			next(error);
		}
	});
}
