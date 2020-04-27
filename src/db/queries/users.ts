import { Query } from '@db';
import type { IUser, DBResponse } from '@interfaces/models';

const all = () => Query<IUser[]>(`SELECT * FROM users`);

const one = (id: number) => Query<IUser[]>(`SELECT * FROM users WHERE id = ?`, [id]);

const insert = (user: IUser) => Query<DBResponse>(`INSERT INTO users SET ?`, user);

const update = (user: IUser) => Query<DBResponse>(`UPDATE users SET ?`, user);

const destroy = (id: number) => Query<DBResponse>(`DELETE FROM users WHERE id = ?`, [id]);

const find = (column: string, value: string | number) =>
	Query<IUser[]>(`SELECT * FROM users WHERE ?? = ?`, [column, value]);

const search = (column: string, value: string | number) =>
	Query<IUser[]>(`SELECT * FROM users WHERE ?? LIKE ?`, [column, `%${value}%`]);

export default {
	all,
	one,
	insert,
	update,
	destroy,
	find,
	search
};
