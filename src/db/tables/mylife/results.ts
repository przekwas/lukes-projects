import { Query } from '../../query';

export function dailyWeights(user_id: string) {
	return Query<any>(
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
	return Query<any>(
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
