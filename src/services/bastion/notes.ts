import { Query } from '../../db';
import { v4 as uuidv4 } from 'uuid';
import type { BastionMiscNotesTable, UsersTable } from '../../types/mysql';

async function create(newNote: BastionMiscNotesTable) {
	try {
		newNote.id = uuidv4();
		await Query('INSERT INTO bastion_misc_notes SET ?', [newNote]);
		return {
			id: newNote.id,
			message: 'note inserted'
		};
	} catch (error) {
		throw error;
	}
}

async function getAll() {
	try {
		const notes = await Query<(BastionMiscNotesTable & UsersTable)[]>(`
		SELECT 
    		bmn.*, 
    		u1.username,
    		u2.username as modified_by_username
		FROM
    		bastion_misc_notes bmn
        		JOIN
    		users u1 ON u1.id = bmn.user_id
        		LEFT JOIN
    		users u2 ON u2.id = bmn.modified_by
		ORDER BY bmn.created_at DESC;
        `);
		return notes;
	} catch (error) {
		throw error;
	}
}

async function getOne(note_id: string) {
	try {
		const [note] = await Query<(BastionMiscNotesTable & UsersTable)[]>(
			`
            SELECT 
    			bmn.*, users.username, u2.username as modified_by_username
			FROM
    			bastion_misc_notes bmn
        			JOIN
    			users ON users.id = bmn.user_id
					LEFT JOIN
    			users u2 ON u2.id = bmn.modified_by
			WHERE
    			bmn.id = ?;
        `,
			note_id
		);
		return note;
	} catch (error) {
		throw error;
	}
}

async function editOne(editedContent: BastionMiscNotesTable, note_id: string) {
	try {
		const result = await Query(
			`
            UPDATE bastion_misc_notes SET ?
            WHERE id = ?
        `,
			[editedContent, note_id]
		);
		return {
			message: `note edited ${!!result.affectedRows}`,
			affectedRows: result.affectedRows
		};
	} catch (error) {
		throw error;
	}
}

async function deleteOne(note_id: string) {
	try {
		const result = await Query(
			`
            DELETE FROM bastion_misc_notes
            WHERE id = ?
        `,
			[note_id]
		);
		return {
			message: `note deleted ${!!result.affectedRows}`,
			affectedRows: result.affectedRows
		};
	} catch (error) {
		throw error;
	}
}

export { create, getAll, getOne, editOne, deleteOne };