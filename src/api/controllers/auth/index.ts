import { validationResult } from 'express-validator';
import { users } from '../../../db';
import { createToken } from '../../../utils';
import type { Request, Response, NextFunction } from 'express';

export async function registerController(req: Request, res: Response, next: NextFunction) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const dto = { ...req.body };
		const { id, email } = await users.register(dto);

		const token = createToken({ id, email, role: 0, banned: 0 });

		res.json({ status: 'success', message: 'Registration successful', token });
	} catch (error) {
		next(error);
	}
}

export async function loginController(req: Request, res: Response, next: NextFunction) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { id, email, role, banned } = req.currentUser;

		const token = createToken({ id, email, role, banned });
		res.json({ status: 'success', message: 'Login success', token });
	} catch (error) {
		next(error);
	}
}
