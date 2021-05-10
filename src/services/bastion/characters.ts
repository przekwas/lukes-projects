import { Query } from '../../db';
import { v4 as uuidv4 } from 'uuid';
import { getFormattedDate } from '../../utils/date-formatter';
import type { BastionCharactersTable, UsersTable } from '../../types/mysql';

async function create(newCharacter: BastionCharactersTable) {
	try {
		newCharacter.id = uuidv4();
		await Query('INSERT INTO bastion_characters SET ?', [newCharacter]);
		return {
			id: newCharacter.id,
			message: 'character inserted'
		};
	} catch (error) {
		throw error;
	}
}

async function getAll() {
	try {
		const characters = await Query<(BastionCharactersTable & UsersTable)[]>(`
		SELECT 
			bc.*, users.username
		FROM
			bastion_characters bc
				JOIN
			users ON users.id = bc.user_id
		ORDER BY bc.created_at DESC;
        `);
		return characters;
	} catch (error) {
		throw error;
	}
}

async function getOne(character_id: string) {
	try {
		const [character] = await Query<(BastionCharactersTable & UsersTable)[]>(
			`
            SELECT 
    			bc.*, users.username
			FROM
    			bastion_characters bc
        			JOIN
    			users ON users.id = bc.user_id
			WHERE
    			bc.id = ?;
        `,
			character_id
		);
		return character;
	} catch (error) {
		throw error;
	}
}

async function editOne(editedContent: BastionCharactersTable, character_id: string) {
	try {
		editedContent.modified_at = getFormattedDate();
		const result = await Query(
			`
            UPDATE bastion_characters SET ?
            WHERE id = ?
        `,
			[editedContent, character_id]
		);
		console.log(result);
		return {
			message: `character edited ${!!result.affectedRows}`,
			affectedRows: result.affectedRows
		};
	} catch (error) {
		throw error;
	}
}

async function deleteOne(character_id: string) {
	try {
		const result = await Query(
			`
            DELETE FROM bastion_characters
            WHERE id = ?
        `,
			[character_id]
		);
		return {
			message: `character deleted ${!!result.affectedRows}`,
			affectedRows: result.affectedRows
		};
	} catch (error) {
		throw error;
	}
}

export { create, getAll, getOne, editOne, deleteOne };
