import { Router } from 'express';
import charactersRouter from './characters';
import locationsRouter from './locations';

const bastionRouter = Router();

bastionRouter.use('/characters', charactersRouter);
bastionRouter.use('/locations', locationsRouter);

export default bastionRouter;