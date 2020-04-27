import { Query } from '@db';
import type { IToken, DBResponse } from '@interfaces/models';

const all = () => Query<IToken[]>(`SELECT * FROM tokens`);

const one = (id: number) => Query<IToken[]>(`SELECT * FROM tokens WHERE id = ?`, [id]);

const insert = (token: IToken) => Query<DBResponse>(`INSERT INTO tokens SET ?`, token);

const update = (token: string, id: number) =>
	Query<DBResponse>(`UPDATE tokens SET token = ? WHERE id = ?`, [token, id]);

const destroy = (id: number) => Query<DBResponse>(`DELETE FROM tokens WHERE id = ?`, [id]);

const find = (column: string, value: string | number) =>
	Query<IToken[]>(`SELECT * FROM tokens WHERE ?? = ?`, [column, value]);

const search = (column: string, value: string | number) =>
	Query<IToken[]>(`SELECT * FROM tokens WHERE ?? LIKE ?`, [column, `%${value}%`]);

const match = (id: number, uniq: string) =>
	Query(`SELECT * FROM tokens WHERE id = ? AND uniq = ?`, [id, uniq]);

export default {
	all,
	one,
	insert,
	update,
	destroy,
	find,
	search,
	match
};
