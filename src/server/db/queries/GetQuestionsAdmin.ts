import pool from '../pool';

export default (offset: number) => {
    return new Promise<IQueryQuestionsAdmin>((resolve, reject) => {
        pool.query(
        `
        SELECT * FROM questions q
        ORDER BY _created DESC
        LIMIT 5 OFFSET ${offset};
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