import * as mysql from 'mysql';
import Table from 'tablecrud';

import pool from './pool';
import GetQuestionsWithCategory from './queries/GetQuestionsWithCategory';

export const Queries = {
    GetQuestionsWithCategory
}

export const Questions = new Table<IQuestions>(pool, 'questions', {
    id: mysql.Types.INT24,
    question: mysql.Types.VARCHAR,
    category_id: mysql.Types.INT24,
    _created: mysql.Types.TIMESTAMP
});

export interface IQuestions {
    id: number;
    question: string;
    category_id: number;
    _created: Date;
};

export const Categories = new Table<ICategories>(pool, 'categories', {
    id: mysql.Types.INT24,
    name: mysql.Types.VARCHAR,
    _created: mysql.Types.TIMESTAMP
});

export interface ICategories {
    id: number;
    name: string;
    _created: Date;
};

export const Users = new Table<IUser>(pool, 'users', {
    id: mysql.Types.INT24,
    email: mysql.Types.VARCHAR,
    password: mysql.Types.VARCHAR,
    firstname: mysql.Types.VARCHAR,
    lastname: mysql.Types.VARCHAR,
    role: mysql.Types.VARCHAR,
    __created: mysql.Types.DATETIME
});

export interface IUser {
    id?: number;
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    role?: string;
    __created?: Date;
}

//auth stuff below this ---- \/

export const AccessTokens = new Table<IAccessToken>(pool, 'accesstokens', {
    id: mysql.Types.INT24,
    userid: mysql.Types.INT24,
    token: mysql.Types.VARCHAR,
    expires: mysql.Types.DATETIME,
    __created: mysql.Types.DATETIME
});

export interface IAccessToken {
    id?: number;
    userid?: number;
    token?: string;
    expires?: Date;
    __created?: Date;
}

