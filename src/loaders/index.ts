import expressLoader from './express';
import logger from './logger';

export default async function ({ expressApp }) {
	await expressLoader({ app: expressApp });
	logger.info('✌️ express loaded');
}