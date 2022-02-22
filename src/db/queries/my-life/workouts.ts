import { Table } from '@/utils';

interface MyLifeWorkoutsTable {
	id?: number;
	name?: string;
	user_id?: string;
	_created?: Date;
}

export const workouts = new Table<MyLifeWorkoutsTable>('mylife_workouts');