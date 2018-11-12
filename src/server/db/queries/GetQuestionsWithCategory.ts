import pool from '../pool';

export default (id: number) => {
    return new Promise<IQueryQuestionsWithCategory>((resolve, reject) => {
        pool.query(
        `
        SELECT q.id, q.question, q._created, c.name AS category FROM questions q
        JOIN categories c ON c.id = q.category_id
        WHERE category_id = ${id}
        AND q._created > DATE_SUB(NOW(), INTERVAL 24 HOUR);
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