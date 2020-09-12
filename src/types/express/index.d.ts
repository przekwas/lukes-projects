import { Request } from "express";
import { UserModel } from "types/models";

interface ResponseError extends Error {
	status?: number;
}

interface ReqUser extends Request {
	user: UserModel;
}