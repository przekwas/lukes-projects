import { Query } from '@db';
import type { IBlog, IUser, DBResponse } from '@interfaces/models';

const all = () =>
	Query<(IBlog | IUser)[]>(
		`SELECT blogs.*, CONCAT(users.first_name, ' ', users.last_name) as author FROM blogs JOIN users ON users.id = blogs.userid ORDER BY blogs.created_at DESC`
	);

const one = (id: number) =>
	Query<(IBlog | IUser)[]>(
		`SELECT blogs.*, CONCAT(users.first_name, ' ', users.last_name) as author FROM blogs JOIN users ON users.id = blogs.userid WHERE blogs.id = ?`,
		[id]
	);

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
