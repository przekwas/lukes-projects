import { Query } from '@/db/query';

interface MyLifeExercisesTable {
	id?: number;
	workout_id?: string;
	user_id?: string;
	name?: string;
	machine?: string;
	reps?: number;
	weight?: number;
	time_recorded: string;
	_created?: Date;
}

const all = () => {
	return Query<MyLifeExercisesTable[]>(`
	SELECT 
		mylife_exercises.*,
		mylife_workouts.name as workout_name,
		users.username
	FROM mylife_exercises
	JOIN users ON users.id = mylife_exercises.user_id
	JOIN mylife_workouts ON mylife_workouts.id = mylife_exercises.workout_id
	`);
};

const one = (id: string) => {
	return Query<MyLifeExercisesTable[]>(
		`
	SELECT 
		mylife_exercises.*,
		mylife_workouts.name as workout_name,
		users.username
	FROM mylife_exercises
	JOIN users ON users.id = mylife_exercises.user_id
	JOIN mylife_workouts ON mylife_workouts.id = mylife_exercises.workout_id
	WHERE mylife_exercises.id = ?
	`,
		[id]
	);
};

const allForUser = (user_id: string) => {
	return Query(
		`
	SELECT 
		mylife_exercises.*,
		mylife_workouts.name as workout_name
	FROM mylife_exercises
	JOIN mylife_workouts ON mylife_workouts.id = mylife_exercises.workout_id
	WHERE mylife_exercises.user_id = ?
	`,
		[user_id]
	);
};

const allForUserAndSet = (user_id: string, workout_id: string) => {
	return Query(
		`
	SELECT 
		mylife_exercises.*,
		mylife_workouts.name as workout_name
	FROM mylife_exercises
	JOIN mylife_workouts ON mylife_workouts.id = mylife_exercises.workout_id
	WHERE mylife_exercises.user_id = ? AND mylife_exercises.workout_id = ?
	`,
		[user_id, workout_id]
	);
};

const insert = (dto: MyLifeExercisesTable) => {
	return Query('INSERT INTO mylife_exercises SET ?', dto);
};

export const exercises = {
	all,
	allForUser,
	allForUserAndSet,
	one,
	insert
};
