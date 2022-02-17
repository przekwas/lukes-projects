import { Table } from '../../../utils';

export interface HipHopTable {
	id?: number;
	title?: string;
	artist?: string;
	url?: string;
	image?: string;
	thumbnail_image?: string;
	_created?: Date;
}

export const hiphop = new Table<HipHopTable>('hiphop');