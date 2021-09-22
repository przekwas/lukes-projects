import { Query } from '../../db';
import type { PickemTeamsTable } from '../../types/mysql';

async function getAll() {
	try {
		const teams = await Query<PickemTeamsTable[]>(`
            SELECT 
                *
            FROM pickem_teams;
        `);
		return teams;
	} catch (error) {
		throw error;
	}
}

async function getOne(team_id: string) {
	try {
		const [team] = await Query<PickemTeamsTable[]>(
			`
            SELECT 
                *
            FROM pickem_teams
			WHERE id = ?;
        `,
			[team_id]
		);
		return team;
	} catch (error) {
		throw error;
	}
}

export { getAll, getOne };
