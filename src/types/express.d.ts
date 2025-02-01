declare global {
	namespace Express {
		interface User {
			userId: string;
			email: string;
			role: string;
		}
		interface Request {
			user?: User;
		}
	}
}

export {};