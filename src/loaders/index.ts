import { Application } from 'express';
import dbLoader from './mysql';
import passportLoader from './passport';
import expressLoader from './express';
import discordLoader from './discord';

export default async function ({ app }: { app: Application }) {
	await dbLoader();
	console.log('db connected and loaded');

	await passportLoader({ app });
	console.log('passport loaded');

	await expressLoader({ app });
	console.log('express loaded');

	await discordLoader();
	console.log('discord bot loaded');
}
