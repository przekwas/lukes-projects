import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { bot } from '../../loaders/discord';

const botRouter = Router();

botRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			discordName: Joi.string().required()
		})
	}),
	async (req, res, next) => {
		try {
			const discordName = req.body.discordName;
			// const channel = bot.channels.cache.get('850038528032243712');
			const guild = bot.guilds.cache.get('734521934594703442');

			const member = guild.member(discordName);

			// const username = bot.users.cache.find(user => {
			//     console.log(user);
			//     return user.tag === discordName;
			// }).id;
			// if (channel.isText()) {
			// 	channel.send(`registration test with discord name: ${discordName}`);
			// }
			res.json(member);
		} catch (error) {
			next(error);
		}
	}
);

export default botRouter;
