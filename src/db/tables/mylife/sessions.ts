import { Table } from '@/db/table-crud';

export interface MyLife_Sessions {
	id?: string;
	name?: string;
	user_id?: string;
	created_at?: string;
	modified_at?: string;
}

export const sessions = new Table<MyLife_Sessions>('mylife_sessions');