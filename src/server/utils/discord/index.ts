import * as Discord from 'discord.js';
import config from '../../config';

const client = new Discord.Client();

client.on('ready', () => {
    console.log("Discord bot ready!");
});

client.on('message', message => {
    //prevent other bots from causing a botception
    if (message.author.bot) return;

    //needs prefix to respond "!"
    if (message.content.indexOf(config.discord.prefix) !== 0) return;

    //set up args and the command prefix
    const args = message.content.slice(config.discord.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        message.channel.send('Pong!');
    }
});

export default client;

