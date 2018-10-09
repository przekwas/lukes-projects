import pool from '../pool';

export default () => {
    return new Promise<IQueryQuestionsWithCategory>((resolve, reject) => {
        pool.query(
        `
            select q.id, q.question, q._created, c.name as category from questions q
            join categories c on c.id = q.category_id;
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

export interface IQueryQuestionsWithCategory {
    id: number;
    question: string;
    _created: Date;
    category: string;
}