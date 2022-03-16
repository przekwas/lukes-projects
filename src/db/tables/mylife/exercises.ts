import { Table } from '@/db/table-crud';

export interface MyLife_Exercises {
	id?: string;
	name?: string;
	reps?: number;
	weight?: number;
	body_weight?: 0 | 1;
	set_id?: string;
	user_id?: string;
	session_id?: string;
	created_at?: string;
	modified_at?: string;
}

export const exercises = new Table<MyLife_Exercises>('mylife_exercises');