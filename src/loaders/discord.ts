import Discord from 'discord.js';
import config from '../config';

export const bot = new Discord.Client();

bot.on('ready', () => {
	console.log(`logged in as ${bot.user.tag}`);
});

bot.on('message', msg => {
	if (!msg.content.startsWith(config.discordBot.prefix) || msg.author.bot) return;

	const args = msg.content.slice(config.discordBot.prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		msg.reply('pong');
	} else if (command === 'info') {
		const bicon = bot.user.displayAvatarURL({ format: 'png', dynamic: true });
		const embed = new Discord.MessageEmbed()
			.setTitle('Bot Information')
			.setThumbnail(bicon)
			.setColor([49, 46, 129])
			.setDescription(
				'This bot is attached to The Bastion Wiki site and API.  At first its purpose is to provide two-factor authentication to registering accounts, but in the future, who knows!'
			)
			.addField('Bot Name', bot.user.username)
			.addField('Bot Creator', 'Mustadio Balthasar Alfred-Winston Van Helmont aka Luke')
			.addField('Bot Github', 'https://github.com/przekwas/tiny-project-api')
			.addField('Bot Creation', bot.user.createdAt);
		msg.channel.send(embed);
	}
});

export default async function () {
	bot.login(config.discordBot.token);
}
