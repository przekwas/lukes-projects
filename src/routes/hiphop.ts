import { Router } from 'express';
import { hiphop } from '@/db/tables';

const route = Router();

export function hipHopRouter(app: Router) {
	app.use('/hiphop', route);

	route.get('/:id', async (req, res, next) => {
		try {
			const id = req.params.id;
			const [result] = await hiphop.one(id);
			res.json(result);
		} catch (error) {
			next(error);
		}
	});

	route.get('/', async (req, res, next) => {
		try {
			const result = await hiphop.all();
			res.json(result);
		} catch (error) {
			next(error);
		}
	});
}

// PUT /api/events/:matchid/:eventid
// function matchesEventId(req, res, next) {

//     if (req.payload.event_ID === req.params.eventid) {

//         const matched = await db.events.one(req.payload.event_ID);
        
//         if (!matched) {
//             res.status(401).json({ msg: 'lols' })
//         } else {
//             next();
//         }

//     } else {
//         res.status(401).json({ msg: 'lols' })
//     }

// }
