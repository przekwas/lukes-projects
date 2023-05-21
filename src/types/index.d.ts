import type { UsersTable } from '../db/users';

export interface ReqUser extends UsersTable {}

export enum UserRole {
	USER = 0,
	ADMIN = 9
}

export enum UserBanned {
	ALLOWED = 0,
	BANNED = 1
}

export enum TokenType {
	ACCESS = 'access',
	REFRESH = 'refresh'
}

export interface ReqPayload {
	id?: string;
	email?: string;
	role?: UserRole;
	banned?: UserBanned;
	type?: TokenType;
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
