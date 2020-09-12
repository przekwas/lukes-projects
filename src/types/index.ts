import type { UserModel } from "./models";

export interface IPayload {
    userid: string;
    email?: string;
    username?: string;
    role?: number;
    banned?: number;
}