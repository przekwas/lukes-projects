import { Query } from '../query';
import type { RowDataPacket } from 'mysql2';

export interface HipHopTable {
	id?: number;
	title?: string;
	artist?: string;
	year?: number;
	url?: string;
	artist_image?: string;
	thumbnail_image?: string;
}

export async function getAll() {
	const [results] = (await Query('SELECT * FROM hiphop;')) as RowDataPacket[][];
	return results;
}

export async function getOne(id: string) {
	const [[results]] = (await Query('SELECT * FROM hiphop WHERE id = ?;', [
		id
	])) as RowDataPacket[][];
	return results;
}
