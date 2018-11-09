import pool from '../pool';

export default () => {
    return new Promise<IQueryQuestionsAdmin>((resolve, reject) => {
        pool.query(
        `
            select * from questions q
        `
            , (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
    });
}

export interface IQueryQuestionsAdmin {
    id: number;
    question: string;
    answered: number;
    _created: Date;
    category: string;
}