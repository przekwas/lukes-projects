import { Query } from '../../db';
import { v4 as uuidv4 } from 'uuid';
import type { BastionLocationsTable, UsersTable } from '../../types/mysql';

async function create(newLocation: BastionLocationsTable) {
	try {
		newLocation.id = uuidv4();
		await Query('INSERT INTO bastion_locations SET ?', [newLocation]);
		return {
			id: newLocation.id,
			message: 'location inserted'
		};
	} catch (error) {
		throw error;
	}
}

async function getAll() {
	try {
		const locations = await Query<(BastionLocationsTable & UsersTable)[]>(`
		SELECT 
    		bl.*, 
    		u1.username,
    		u2.username as modified_by_username
		FROM
    		bastion_locations bl
        		JOIN
    		users u1 ON u1.id = bl.user_id
        		LEFT JOIN
    		users u2 ON u2.id = bl.modified_by
		ORDER BY bl.created_at DESC;
        `);
		return locations;
	} catch (error) {
		throw error;
	}
}

async function getOne(location_id: string) {
	try {
		const [location] = await Query<(BastionLocationsTable & UsersTable)[]>(
			`
            SELECT 
    			bl.*, users.username, u2.username as modified_by_username
			FROM
    			bastion_locations bl
        			JOIN
    			users ON users.id = bl.user_id
					LEFT JOIN
    			users u2 ON u2.id = bl.modified_by
			WHERE
    			bl.id = ?;
        `,
			location_id
		);
		return location;
	} catch (error) {
		throw error;
	}
}

async function editOne(editedContent: BastionLocationsTable, location_id: string) {
	try {
		const result = await Query(
			`
            UPDATE bastion_locations SET ?
            WHERE id = ?
        `,
			[editedContent, location_id]
		);
		return {
			message: `location edited ${!!result.affectedRows}`,
			affectedRows: result.affectedRows
		};
	} catch (error) {
		throw error;
	}
}

async function deleteOne(location_id: string) {
	try {
		const result = await Query(
			`
            DELETE FROM bastion_locations
            WHERE id = ?
        `,
			[location_id]
		);
		return {
			message: `location deleted ${!!result.affectedRows}`,
			affectedRows: result.affectedRows
		};
	} catch (error) {
		throw error;
	}
}

export { create, getAll, getOne, editOne, deleteOne };
