import { Query } from '../../db';
import type { PickemPicksTable } from '../../types/mysql';

async function getAllForWeek({ week_id }: { week_id: string }) {
	try {
		const picks = await Query<PickemPicksTable[]>(
			`
            SELECT 
                *
            FROM pickem_picks
            WHERE week_id = ?;
        `,
			[week_id]
		);
		return picks;
	} catch (error) {
		throw error;
	}
}

export { getAllForWeek };
