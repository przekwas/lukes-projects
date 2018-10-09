import * as express from 'express';
import { Queries } from '../../db';

const router = express.Router();

router.get('/questionswithcategory/:id', async (req, res, next) => {

    try {
        res.json(await Queries.GetQuestionsWithCategory(req.params.id));
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;