import * as Discord from 'discord.js';
import config from '@config';
import { findEnchants } from '@services/discord';

const client = new Discord.Client();
const prefix = config.discord.feragoPrefix;

export default async () => {
	client.login(config.discord.feragoBot);

	client.on('message', async (message) => {
		if (message.content.startsWith(`${prefix}test`)) {
			const enchants = await findEnchants('boots');
			const embed = new Discord.MessageEmbed()
				.setColor('#FF7D0A')
				.setTitle("Ferago's Enchants")
				.setThumbnail(
					'https://lh4.ggpht.com/0RzUTzjq9VnXTv49PzkdHVW8d6cHTGMlXRiVS79I7Q4863lBWV_VY6q4TLpKQTwDSpU=w300'
				)
				.addFields(enchants);
			message.channel.send(embed);
		}
	});
};