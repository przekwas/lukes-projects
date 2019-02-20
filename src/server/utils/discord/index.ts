import * as Discord from 'discord.js';
import config from '../../config';
import * as bot from './commands';

export const client = new Discord.Client();

client.on('ready', () => {
    console.log("Discord bot ready!");
});

client.on('message', (message: Discord.Message) => {
    if (message.author.bot) return;

    if (message.content.indexOf(config.discord.prefix) !== 0) return;

    const args = message.content.slice(config.discord.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command == 'bot' || command == 'botinfo' || command == 'info') {
        bot.info(message);
    }

    if (command == 'schedule' || command == 'zoom' || command == 'webinars') {
        bot.schedule(message);
    }

    if (command == 'playlist' || command == 'playlists' || command == 'youtube' || command == 'Youtube' || command == 'YouTube') {
        bot.playlist(message);
    }

    if (command == 'ask' && args.includes('question' || 'a question')) {
        bot.question(message);
    }

    if (command == 'help' || command == 'commands') {
        bot.help(message);
    }

    if (command == 'test') {
        let res = message.member.roles.some(role => role.name === 'catalyst' || role.name === 'molecular' || role.name === 'admin');
        message.channel.send(res);
    }

});

export default client;
