import { RequestHandler } from 'express';

import TableRouter from 'tablerouter';
import { IQuestions, Questions } from '../../db';

import bot from '../../utils/discord';
import * as moment from 'moment';

const isAdmin: RequestHandler = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.sendStatus(401);
    }
    return next();
}

const questionBotInform: RequestHandler = (req, res, next) => {

    if (req.method === 'POST') {

        let date = new Date();
        bot.users.find((user: any) => user.username === 'Stormshield').send(`
        *A new question has been added!* \n **At**: ${moment(date).format("dddd, MMM Do YYYY, h:mm a")} \n **Question**: \`${req.body.question}\`
            `);
        return next();

    } else if (req.method === 'PUT' && req.body.answered === 1 && req.body.discord_username) {

        if (bot.users.find((user: any) => user.username === `${req.body.discord_username}`) !== null) {

            let date = new Date();
            bot.users.find((user: any) => user.username === `${req.body.discord_username}`).send(`
            Your question \`{ "id": ${req.body.id} }\` has been answered at **${moment(date).format("dddd, MMM Do YYYY, h:mm a")}**, hope the webinar recording helps! :wink:
                `);
            return next();

        }

    }
    return next();
}

export default new TableRouter<IQuestions>(Questions, {
    canWrite: questionBotInform,
    canDelete: isAdmin
}).Router