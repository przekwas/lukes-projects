import { ReqPayload, ReqUser } from "./express";

declare global {
    namespace Express {
        export interface Request {
            currentUser: ReqUser;
            payload: ReqPayload;
        }
    }
}