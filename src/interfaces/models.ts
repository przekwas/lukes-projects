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
    uniq?: string;
    created_at?: string;
}

export interface DBResponse {
    insertId: number;
    affectedRows: number;
}

export interface ICat_Find {
    id?: number;
    userid?: number;
    cat_nickname?: string;
    cat_name?: string;
    cat_breed?: string;
    lat?: number;
    lng?: number;
    created_at?: string;
}