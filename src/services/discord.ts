import db from '@db';

export const findEnchants = async (filterItem: string) => {
	try {
		const fallback = [{ name: 'No Enchants Found', value: 'Try a different filter' }];
		const allEnchants = await db.enchanter.enchants.all();
		const filtered = allEnchants
			.filter((enchant) => enchant.item.toLowerCase() === filterItem.toLowerCase())
			.map((enchant) => ({
				name: enchant.enchant,
				value: `${enchant.effect} to ${enchant.item}`
			}));
		return filtered.length === 0 ? fallback : filtered;
	} catch (error) {
		throw error;
	}
};
