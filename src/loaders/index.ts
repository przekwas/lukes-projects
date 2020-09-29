import express from 'express';
import knexLoader from './knex';
import passportLoader from './passport';
import expressLoader from './express';

export default async function ({ app }: { app: express.Application }) {
	await knexLoader.raw('SELECT 1+1 AS RESULT');
	console.log('✌️ knex loaded');

	await passportLoader({ app });
	console.log('✌️ passport loaded');

	await expressLoader({ app });
	console.log('✌️ express loaded');
}
