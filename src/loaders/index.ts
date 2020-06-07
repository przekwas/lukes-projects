import dbLoader from './mysql';
import passportLoader from './passport';
import expressLoader from './express';
import discordLoader from './discord';
import logger from '@logger';

export default async ({ expressApp }) => {

    await dbLoader();
    logger.info('✌️ db connected and loaded');

    await passportLoader({ app: expressApp });
    logger.info('✌️ passport loaded');

    await expressLoader({ app: expressApp });
    logger.info('✌️ express loaded');

    await discordLoader();
    logger.info('✌️ discord bot loaded');

}