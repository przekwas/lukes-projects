import * as Discord from 'discord.js';
import { client } from './index';

const info = async (message: Discord.Message) => {
    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
        .setDescription('Bot Information')
        .setColor('#0091ea')
        .setThumbnail(bicon)
        .addField('Bot Name', client.user.username)
        .addField('Bot Creator', 'Luke aka Cool Hand Luke aka Stormshield')
        .addField('Bot Purpose', 'Allow Molecular and Catalyst Students to get their available resources')
        .addField('Bot Commands', '!help')
        .addField('Created On', client.user.createdAt)
    message.author.send(botembed);
}

const playlist = async (message: Discord.Message) => {
    if (message.channel.type === 'dm') {
        message.author.send(`Don't DM me directly! I unfortunately need to check your Covalence Role first from a channel.  :sweat:`);
    } else {
        if (message.member.roles.some(role => role.name === 'catalyst' || role.name === 'molecular')) {
            let bicon = client.user.displayAvatarURL;
            let botembed = new Discord.RichEmbed()
                .setColor('#0091ea')
                .setThumbnail(bicon)
                .addField('YouTube Playlists', 'All webinars are uploaded to playlists found at: https://www.youtube.com/channel/UCHCIVU68f3-nOrIPOgmWbbg/playlists')
            message.author.send(botembed);
        }
    }
}

const schedule = async (message: Discord.Message) => {
    if (message.channel.type === 'dm') {
        message.author.send(`Don't DM me directly! I unfortunately need to check your Covalence Role first from a channel.  :sweat:`);
    } else {
        if (message.member.roles.some(role => role.name === 'catalyst' || role.name === 'molecular')) {
            let bicon = client.user.displayAvatarURL;
            let botembed = new Discord.RichEmbed()
                .setDescription('Zoom Webinar Schedule')
                .addField('Schedule', 'All webinar times are Central (CST) time, Monday through Thursday.')
                .setColor('#0091ea')
                .setThumbnail(bicon)
                .addField('Front-end', '11:00 AM CST https://zoom.us/j/344694535')
                .addField('React', '11:40 AM CST https://zoom.us/j/294274095')
                .addField('Back-end', '12:20 PM CST https://zoom.us/j/450011134')
                .addField('Database / TS', '1:00 PM CST https://zoom.us/j/712626098')
                .addField('Advanced Topics', '1:40 PM CST https://zoom.us/j/906191854')
            message.author.send(botembed);
        }
    }
}

const question = async (message: Discord.Message) => {
    if (message.channel.type === 'dm') {
        message.author.send(`Don't DM me directly! I unfortunately need to check your Covalence Role first from a channel.  :sweat:`);
    } else {
        if (message.member.roles.some(role => role.name === 'catalyst' || role.name === 'molecular')) {
            let bicon = client.user.displayAvatarURL;
            let botembed = new Discord.RichEmbed()
                .setDescription('Got a Question for Webinar?')
                .setColor('#0091ea')
                .setThumbnail(bicon)
                .addField('Asking the Question', 'Ask here: https://lukes-projects.herokuapp.com/')
                .addField('Getting an Answer', 'The question will be answered in the *next upcoming* webinar of that topic.  And the video will be uploaded to the appropriate YouTube playlist.  Ask the bot `!playlist` to ge that info ;)')
            message.author.send(botembed);
        }
    }
}

const help = async (message: Discord.Message) => {
    if (message.channel.type === 'dm') {
        message.author.send(`Don't DM me directly! I unfortunately need to check your Covalence Role first from a channel.  :sweat:`);
    } else {
        if (message.member.roles.some(role => role.name === 'catalyst' || role.name === 'molecular')) {
            let bicon = client.user.displayAvatarURL;
            let botembed = new Discord.RichEmbed()
                .setDescription('Available Commands')
                .setColor('#0091ea')
                .setThumbnail(bicon)
                .addField('Bot Info', '`!info`')
                .addField('YouTube Playlist Info', '`!playlist`')
                .addField('Webinar Schedule Info', '`!zoom`')
                .addField('Question Sheet Info', '`!ask a question`')
            message.author.send(botembed);
        }
    }
}

export {
    info,
    playlist,
    schedule,
    question,
    help
}