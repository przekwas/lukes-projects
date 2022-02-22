import { Router } from 'express';
import { exercisesRouter } from './exercises';
import { workoutsRouter } from './workouts';

export const myLifeRouter = Router();

myLifeRouter.use('/exercises', exercisesRouter);
myLifeRouter.use('/workouts', workoutsRouter);