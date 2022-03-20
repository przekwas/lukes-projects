import { Table } from '@/db/table-crud';

export interface MyLife_Cardios {
	id?: string;
	name?: string;
	time?: number;
	estimated_calories?: number;
	estimated_distance?: number;
	user_id?: string;
	session_id?: string;
	created_at?: string;
	modified_at?: string;
}

export const cardios = new Table<MyLife_Cardios>('mylife_cardios');