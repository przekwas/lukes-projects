import { Request } from 'express';
import type { IUser } from '@interfaces/models';

export interface ReqUser extends Request {
    user: IUser
}