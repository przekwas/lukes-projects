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

