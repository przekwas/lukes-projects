import { Table } from '@/db/table-crud';

export interface MyLife_Sets {
	id?: string;
	name?: string;
	user_id?: string;
	session_id?: string;
	created_at?: string;
	modified_at?: string;
}

export const sets = new Table<MyLife_Sets>('mylife_sets');