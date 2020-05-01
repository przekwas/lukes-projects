import { Query } from '@db';
import type { IBlog, DBResponse } from '@interfaces/models';

const all = () => Query<IBlog[]>(`SELECT * FROM blogs`);

const one = (id: number) => Query<IBlog[]>(`SELECT * FROM blogs WHERE id = ?`, [id]);

const insert = (blog: IBlog) => Query<DBResponse>(`INSERT INTO blogs SET ?`, blog);

const update = (blog: string, id: number) =>
	Query<DBResponse>(`UPDATE blogs SET ? WHERE id = ?`, [blog, id]);

const destroy = (id: number) => Query<DBResponse>(`DELETE FROM blogs WHERE id = ?`, [id]);

const find = (column: string, value: string | number) =>
	Query<IBlog[]>(`SELECT * FROM blogs WHERE ?? = ?`, [column, value]);

const search = (column: string, value: string | number) =>
	Query<IBlog[]>(`SELECT * FROM blogs WHERE ?? LIKE ?`, [column, `%${value}%`]);

export default {
	all,
	one,
	insert,
	update,
	destroy,
	find,
	search
};
