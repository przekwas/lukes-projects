import { format } from 'fecha';

export function getFormattedDate() {
	return format(new Date(), 'YYYY-MM-DD HH:mm:ss');
}
