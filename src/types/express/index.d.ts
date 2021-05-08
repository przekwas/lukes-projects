import type { UsersTable } from '../mysql';

export interface ReqUser extends UsersTable {}

export interface ReqPayload {
	id?: string;
	username?: string;
	role?: 1 | 9;
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