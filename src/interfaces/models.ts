export interface IUser {
    id?: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
    salt?: string;
    role?: string;
    created_at?: Date;
}

export interface IToken {
    id?: number;
    userid?: number;
    token?: string;
    created_at?: string;
}

export interface DBResponse {
    insertId: number;
    affectedRows: number;
}