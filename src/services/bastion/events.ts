import { Query } from '../../db';
import { v4 as uuidv4 } from 'uuid';
import type { BastionEventsTable, UsersTable } from '../../types/mysql';

async function create(newEvent: BastionEventsTable) {
	try {
		newEvent.id = uuidv4();
		await Query('INSERT INTO bastion_events SET ?', [newEvent]);
		return {
			id: newEvent.id,
			message: 'event inserted'
		};
	} catch (error) {
		throw error;
	}
}

async function getAll() {
	try {
		const events = await Query<(BastionEventsTable & UsersTable)[]>(`
		SELECT 
    		be.*, 
    		u1.username,
    		u2.username as modified_by_username
		FROM
    		bastion_events be
        		JOIN
    		users u1 ON u1.id = be.user_id
        		LEFT JOIN
    		users u2 ON u2.id = be.modified_by
		ORDER BY be.created_at DESC;
        `);
		return events;
	} catch (error) {
		throw error;
	}
}

async function getOne(event_id: string) {
	try {
		const [event] = await Query<(BastionEventsTable & UsersTable)[]>(
			`
            SELECT 
    			be.*, users.username, u2.username as modified_by_username
			FROM
    			bastion_events be
        			JOIN
    			users ON users.id = be.user_id
					LEFT JOIN
    			users u2 ON u2.id = be.modified_by
			WHERE
    			be.id = ?;
        `,
			event_id
		);
		return event;
	} catch (error) {
		throw error;
	}
}

async function editOne(editedContent: BastionEventsTable, event_id: string) {
	try {
		const result = await Query(
			`
            UPDATE bastion_events SET ?
            WHERE id = ?
        `,
			[editedContent, event_id]
		);
		return {
			message: `event edited ${!!result.affectedRows}`,
			affectedRows: result.affectedRows
		};
	} catch (error) {
		throw error;
	}
}

async function deleteOne(event_id: string) {
	try {
		const result = await Query(
			`
            DELETE FROM bastion_events
            WHERE id = ?
        `,
			[event_id]
		);
		return {
			message: `event deleted ${!!result.affectedRows}`,
			affectedRows: result.affectedRows
		};
	} catch (error) {
		throw error;
	}
}

export { create, getAll, getOne, editOne, deleteOne };