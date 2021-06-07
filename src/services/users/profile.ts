import { Query } from '../../db';

async function getProfile(userid: string) {
	try {
		const [[profile], [character_count], [location_count], [events_count], [misc_notes_count]] =
			await Query<any>('CALL spGetProfileInfo(?)', [userid]);
		return {
			profile: { ...profile },
			counts: {
				...character_count,
				...location_count,
				...events_count,
				...misc_notes_count
			}
		};
	} catch (error) {
		throw error;
	}
}

export { getProfile };
