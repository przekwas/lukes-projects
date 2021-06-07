import { Router } from 'express';
import charactersRouter from './characters';
import locationsRouter from './locations';
import eventsRouter from './events';
import notesRouter from './notes';

const bastionRouter = Router();

bastionRouter.use('/characters', charactersRouter);
bastionRouter.use('/locations', locationsRouter);
bastionRouter.use('/events', eventsRouter);
bastionRouter.use('/notes', notesRouter);

export default bastionRouter;