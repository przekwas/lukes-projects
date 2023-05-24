import { Query } from '../query';
import { v4 as uuidv4 } from 'uuid';
import type { RowDataPacket, OkPacket } from 'mysql2';

export interface SessionsTable {
	id?: string; // char(36)
	name?: string; // varchar(255)
	user_id?: string; // char(36)
	created_at?: Date; // datetime
	updated_at?: Date | null; // datetime, allows null
}

export async function getLastFiveForUser(user_id: string) {
	const [result] = (await Query(
		'SELECT id, name, created_at FROM wb_sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 5;',
		[user_id]
	)) as RowDataPacket[][];
	return result;
}

export async function insertForUser(payload: SessionsTable) {
	payload.id = uuidv4();
	const [result] = (await Query('INSERT INTO wb_sessions SET ?;', payload)) as OkPacket[];
	return { id: payload.id, ...result };
}

export async function editOneForUser({
	id,
	name,
	user_id
}: {
	id: string;
	name: string;
	user_id: string;
}) {
	const [result] = (await Query('UPDATE wb_sessions SET name = ? WHERE id = ? AND user_id = ?', [
		name,
		id,
		user_id
	])) as OkPacket[];
	return result;
}

export async function destroyOneForUser({ id, user_id }: { id: string; user_id: string }) {
	const [result] = (await Query('DELETE FROM wb_sessions WHERE id = ? AND user_id = ?', [
		id,
		user_id
	])) as OkPacket[];
	return result;
}
