import { Query } from '@/db/query';

export interface HipHopTable {
	id?: number;
	title?: string;
	artist?: string;
	url?: string;
	image?: string;
	thumbnail_image?: string;
	_created?: string;
}

export function all() {
	return Query<HipHopTable[]>('SELECT * FROM hiphop');
}

export function one(id: string) {
	return Query<HipHopTable[]>('SELECT * FROM hiphop WHERE id = ?', [id]);
}