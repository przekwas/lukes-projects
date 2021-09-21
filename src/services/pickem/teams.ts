import { Query } from '../../db';
import { v4 as uuidv4 } from 'uuid';
import type { ChirperChirpsTable, UsersTable } from '../../types/mysql';

async function create(newChirp: ChirperChirpsTable) {
	try {
		newChirp.id = uuidv4();
		await Query('INSERT INTO pickem_teams SET ?', [newChirp]);
		return {
			id: newChirp.id,
			message: 'chirp inserted'
		};
	} catch (error) {
		throw error;
	}
}

// export { create, getAll, getOne, editOne, deleteOne };
