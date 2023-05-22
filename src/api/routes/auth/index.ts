import { Router } from 'express';
import { body } from 'express-validator';
import { registerController, loginController } from '../../controllers/auth';
import { handleLogin, validateErrorHandler } from '../../../middlewares';

function authRouter(app: Router) {
	const router = Router();
	app.use('/auth', router);

	// register route
	router.post(
		'/register',
		[
			body('email').isEmail().withMessage('Invalid email'),
			body('password')
				.isLength({ min: 6 })
				.withMessage('Password must be at least 6 characters'),
			body('username').isAlphanumeric().withMessage('Username must be alphanumeric'),
			body('first_name').notEmpty().withMessage('First name cannot be empty'),
			body('last_name').notEmpty().withMessage('Last name cannot be empty')
		],
		validateErrorHandler,
		registerController
	);

	// login route
	router.post(
		'/login',
		[
			body('email').isEmail().withMessage('Invalid email'),
			body('password').notEmpty().withMessage('Password is required')
		],
		validateErrorHandler,
		handleLogin,
		loginController
	);

	return router;
}

export { authRouter };
