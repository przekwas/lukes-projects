import { Query } from '../db';
import { v4 as uuidv4 } from 'uuid';
import type { ChirpsTable, UsersTable } from '../types/mysql';

async function create(newChirp: ChirpsTable) {
	try {
		newChirp.id = uuidv4();
		await Query('INSERT INTO chirps SET ?', [newChirp]);
		return {
			id: newChirp.id,
			message: 'chirp inserted'
		};
	} catch (error) {
		throw error;
	}
}

async function getAll() {
	try {
		const chirps = await Query<(ChirpsTable & UsersTable)[]>(`
            SELECT 
                chirps.*, users.username
            FROM chirps
            JOIN users ON users.id = chirps.user_id
            ORDER BY chirps.created_at DESC;
        `);
		return chirps;
	} catch (error) {
		throw error;
	}
}

async function getOne(chirp_id: string) {
	try {
		const [chirp] = await Query<(ChirpsTable & UsersTable)[]>(
			`
            SELECT 
                chirps.*, users.username
            FROM chirps
            JOIN users ON users.id = chirps.user_id
            WHERE chirps.id = ?
        `,
			chirp_id
		);
		return chirp;
	} catch (error) {
		throw error;
	}
}

async function editOne(editedContent: ChirpsTable, chirp_id: string, user_id: string) {
	try {
		const result = await Query(
			`
            UPDATE chirps SET ?
            WHERE id = ? AND user_id = ?
        `,
			[editedContent, chirp_id, user_id]
		);
        console.log(result)
		return {
			message: `chirp edited ${!!result.affectedRows}`,
			affectedRows: result.affectedRows
		};
	} catch (error) {
		throw error;
	}
}

async function deleteOne(chirp_id: string, user_id: string) {
	try {
		const result = await Query(
			`
            DELETE FROM chirps
            WHERE id = ? AND user_id = ?
        `,
			[chirp_id, user_id]
		);
		return {
			message: `chirp deleted ${!!result.affectedRows}`,
			affectedRows: result.affectedRows
		};
	} catch (error) {
		throw error;
	}
}

export { create, getAll, getOne, editOne, deleteOne };
