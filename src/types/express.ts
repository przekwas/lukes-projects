import { Request } from 'express';

import type { UserModel } from './models';

export interface ReqUser extends Request {
	user: UserModel;
}

export type ExpressError = {
	status: number;
	message?: string;
	name?: string;
};
