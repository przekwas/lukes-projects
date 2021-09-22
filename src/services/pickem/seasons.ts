import { Query } from '../../db';
import { v4 as uuidv4 } from 'uuid';
import type { PickemSeasonsTable } from '../../types/mysql';

async function create(newSeason: PickemSeasonsTable) {
	try {
		newSeason.id = uuidv4();
		await Query('INSERT INTO pickem_seasons SET ?', [newSeason]);
		return {
			id: newSeason.id,
			message: 'season inserted'
		};
	} catch (error) {
		throw error;
	}
}

export { create };
