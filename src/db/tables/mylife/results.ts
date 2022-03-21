import { Query } from '../../query';
import type { MyLife_Exercises } from './exercises';
import type { MyLife_Sets } from './sets';
import type { MyLife_Cardios } from './cardios';

export function dailyWeights(user_id: string) {
	return Query<(MyLife_Exercises & MyLife_Sets)[]>(
		`
    SELECT 
        ex.*, st.name
    FROM
        mylife_exercises ex
            JOIN
        mylife_sets st ON st.id = ex.set_id
    WHERE
        ex.created_at >= CURDATE()
            AND ex.created_at < CURDATE() + INTERVAL 1 DAY
            AND ex.user_id = ?
    ORDER BY ex.created_at;
    `,
		[user_id]
	);
}

export function dailyCardio(user_id: string) {
	return Query<MyLife_Cardios[]>(
		`
    SELECT 
        *
    FROM
        mylife_cardios
    WHERE
        created_at >= CURDATE()
            AND created_at < CURDATE() + INTERVAL 1 DAY
            AND user_id = ?
    ORDER BY created_at;
    `,
		[user_id]
	);
}

export function totalCardioStats() {
	return Query<{ total_miles: number; total_calories: number; total_time: number }[]>(`
    SELECT
        SUM(estimated_distance) as total_miles,
        SUM(estimated_calories) as total_calories,
        SUM(time) as total_time
    FROM
        mylife_cardios;
    `);
}

export function totalExerciseStats() {
	return Query<{ total_weight_moved: number; total_reps: number }[]>(`
    SELECT 
        SUM(weight) as total_weight_moved,
        SUM(reps) as total_reps
    FROM
        mylife_exercises;
    `);
}

export function totalSetsStats() {
	return Query<{ total_sets: number }[]>(`
    SELECT 
        COUNT(id) AS total_sets
    FROM
        mylife_sets;
    `);
}
