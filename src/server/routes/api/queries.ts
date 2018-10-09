import * as express from 'express';
import { Queries } from '../../db';

const router = express.Router();

router.get('/questionswithcategory', async (req, res, next) => {

    try {
        res.json(await Queries.());
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;