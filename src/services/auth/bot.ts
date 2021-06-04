import { Query } from '../../db';
import { bot } from '../../loaders/discord';
import { MessageEmbed } from 'discord.js';
import { BastionRegisterTable, UsersTable } from '../../types/mysql';
import { createToken } from '../../utils/tokens';

async function registerRandomCode({
	discord_name,
	user_id,
	email
}: {
	discord_name: string;
	user_id: string;
	email: string;
}) {
	try {
		const random = Math.floor(Math.random() * 10000);
		await Query('INSERT INTO bastion_register (user_id, random_code) VALUE (?, ?)', [
			user_id,
			random
		]);

		const userfound = bot.users.cache.find(user => user.tag === discord_name);
		const bicon = bot.user.displayAvatarURL();
		const embed = new MessageEmbed()
			.setColor([49, 46, 129])
			.setThumbnail(bicon)
			.setTitle('I cast Sending!')
			.setDescription(
				'This sending has reached you to finish registering your account to The Bastion Wiki!'
			)
			.addField(
				'Instructions',
				'Copy the 4 digit number or enter it manually on the "Enter 4 Digit Code" page during the registration process.'
			)
			.addField('Registration Email', email)
			.addField('Random 4 Digit Code', random);
		userfound.send(embed);

		return {
			message: 'random code inserted and direct message sent'
		};
	} catch (error) {
		throw error;
	}
}

async function validateRandomCode(user_id: string, random_code: number) {
	try {
		const [match] = await Query<(BastionRegisterTable & UsersTable)[]>(
			'SELECT * FROM bastion_register JOIN users ON users.id = bastion_register.user_id WHERE user_id = ? AND random_code = ?',
			[user_id, random_code]
		);

		if (!match || match.random_code !== random_code || match.user_id !== user_id) {
			throw new Error('something did not match in the validation process');
		}

		await Query('DELETE FROM bastion_register WHERE user_id = ? AND random_code = ?', [
			user_id,
			random_code
		]);

		await Query('UPDATE users SET validated = 1 WHERE id = ?', [user_id]);

		const { id, username, role, banned } = match;
		const token = createToken({ id, username, role, banned });

		return token;
	} catch (error) {
		throw error;
	}
}

export { registerRandomCode, validateRandomCode };
