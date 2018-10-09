import { RequestHandler } from 'express';

import TableRouter from 'tablerouter';
import { IQuestions, Questions } from '../../db';

const isAdmin: RequestHandler = (req, res, next) => {

    if(!req.user || req.user.role !== 'admin') {
        return res.sendStatus(401);
    }

    return next();
}

export default new TableRouter<IQuestions>(Questions, {
    canDelete: isAdmin,
    canWrite: isAdmin
}).Router