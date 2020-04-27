import { Query } from '@db';
import type { ICat_Find, DBResponse } from '@interfaces/models';

const all = () => Query<ICat_Find[]>(`SELECT * FROM cat_finds`);

const one = (id: number) => Query<ICat_Find[]>(`SELECT * FROM cat_finds WHERE id = ?`, [id]);

const insert = (cat: ICat_Find) => Query<DBResponse>(`INSERT INTO cat_finds SET ?`, cat);

const update = (cat: ICat_Find, id: number) =>
	Query<DBResponse>(`UPDATE cat_finds SET ? WHERE id = ?`, [cat, id]);

const destroy = (id: number) => Query<DBResponse>(`DELETE FROM cat_finds WHERE id = ?`, [id]);

const find = (column: string, value: string | number) =>
	Query<ICat_Find[]>(`SELECT * FROM cat_finds WHERE ?? = ?`, [column, value]);

const search = (column: string, value: string | number) =>
	Query<ICat_Find[]>(`SELECT * FROM cat_finds WHERE ?? LIKE ?`, [column, `%${value}%`]);

export default {
	all,
	one,
	insert,
	update,
	destroy,
	find,
	search
};
