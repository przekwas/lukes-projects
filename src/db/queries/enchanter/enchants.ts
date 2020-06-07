import { Query } from '@db';
import type { IEnchant, DBResponse } from '@interfaces/models';

const all = () => Query<IEnchant[]>('SELECT * FROM enchants');

const one = (id: number) => Query<IEnchant[]>('SELECT * FROM enchants WHERE id = ?', [id]);

const insert = (enchant: IEnchant) => Query<DBResponse>('INSERT INTO enchants SET ?', enchant);

export default {
	all,
	one,
	insert
};
