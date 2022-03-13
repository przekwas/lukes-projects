import type { UsersTable } from '@/db/tables/users';

export interface ReqUser extends UsersTable {}

export interface ReqPayload {
	id?: string;
    email?: string;
	role?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
	banned?: 0 | 1;
	iat?: number;
	exp?: number;
	iss?: string;
}

declare global {
    namespace Express {
        export interface Request {
            currentUser: ReqUser;
            payload: ReqPayload;
        }
    }
}