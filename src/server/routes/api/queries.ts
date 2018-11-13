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
    let offset = Number(req.params.offset);
    if (offset && offset > 0) {
        try {
            res.json(await Queries.GetQuestionsAdmin(offset));
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