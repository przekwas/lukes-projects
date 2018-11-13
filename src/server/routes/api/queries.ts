import { Router, RequestHandler } from 'express';
import { Queries } from '../../db';

const router = Router();

router.get('/questionswithcategory/:id', async (req, res, next) => {

    try {
        res.json(await Queries.GetQuestionsWithCategory(req.params.id));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/questionsadmin/:offset?', async (req, res, next) => {

    if (req.params.offset) {
        try {
            res.json(await Queries.GetQuestionsAdmin(req.params.offset));
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    } else {
        try {
            res.json(await Queries.GetQuestionsAdmin(0));
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

});

export default router;