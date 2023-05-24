import { Query } from '../query';
import { v4 as uuidv4 } from 'uuid';
import type { RowDataPacket, OkPacket } from 'mysql2';

export interface SetsTable {
	id?: string; // char(36)
	name?: string; // varchar(255)
	user_id?: string; // char(36)
	session_id?: string; // char(36)
	created_at?: Date; // datetime
	updated_at?: Date | null; // datetime, allows null
}

export async function getAllForUser(user_id: string) {
	try {
		const [result] = (await Query(
			'SELECT id, name, created_at FROM wb_sets WHERE user_id = ? ORDER BY created_at DESC;',
			[user_id]
		)) as RowDataPacket[][];
		return result;
	} catch (error) {
		throw error;
	}
}

export async function getAllForUserAndSession({
	user_id,
	session_id
}: {
	user_id: string;
	session_id: string;
}) {
	try {
		const [result] = (await Query(
			'SELECT id, name, created_at FROM wb_sets WHERE user_id = ? AND session_id = ? ORDER BY created_at DESC;',
			[user_id, session_id]
		)) as RowDataPacket[][];
		return result;
	} catch (error) {
		throw error;
	}
}

export async function insertForUser(payload: SetsTable) {
	try {
		payload.id = uuidv4();
		const [result] = (await Query('INSERT INTO wb_sets SET ?;', payload)) as OkPacket[];
		return { id: payload.id, ...result };
	} catch (error) {
		throw error;
	}
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
	try {
		const [result] = (await Query('UPDATE wb_sets SET name = ? WHERE id = ? AND user_id = ?', [
			name,
			id,
			user_id
		])) as OkPacket[];
		return result;
	} catch (error) {
		throw error;
	}
}

export async function destroyOneForUser({ id, user_id }: { id: string; user_id: string }) {
	try {
		console.log({ id, user_id });
		const [result] = (await Query('DELETE FROM wb_sets WHERE id = ? AND user_id = ?', [
			id,
			user_id
		])) as OkPacket[];
		return result;
	} catch (error) {
		throw error;
	}
}
