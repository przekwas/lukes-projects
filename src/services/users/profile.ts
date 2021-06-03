import { Query } from '../../db';

async function getProfile(userid: string) {
	try {
		const [[profile], [character_count]] = await Query<any>('CALL spGetProfileInfo(?)', [
			userid
		]);
		return {
			profile: { ...profile },
			counts: {
				...character_count,
				location_count: 0,
				events_count: 0,
				misc_notes_count: 0
			}
		};
	} catch (error) {
		throw error;
	}
}

export { getProfile };
