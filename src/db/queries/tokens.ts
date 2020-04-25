import { Query } from '../';
import type { IToken, DBResponse } from '@interfaces/models';

const all = () => Query<IToken[]>(`SELECT * FROM tokens`);

const one = (id: number) => Query<IToken[]>(`SELECT * FROM tokens WHERE id = ?`, [id]);

const insert = (user: IToken) => Query<DBResponse>(`INSERT INTO tokens SET ?`, user);

const update = (user: IToken) => Query<DBResponse>(`UPDATE tokens SET ?`, user);

const destroy = (id: number) => Query<DBResponse>(`DELETE FROM tokens WHERE id = ?`, [id]);

const find = (column: string, value: string | number) =>
	Query<IToken[]>(`SELECT * FROM tokens WHERE ?? = ?`, [column, value]);

const search = (column: string, value: string | number) =>
	Query<IToken[]>(`SELECT * FROM tokens WHERE ?? LIKE ?`, [column, value]);

export default {
	all,
	one,
	insert,
	update,
    destroy,
    find,
    search
};
