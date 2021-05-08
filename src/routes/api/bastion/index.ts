import { Router } from 'express';
import charactersRouter from './characters';

const authRouter = Router();

authRouter.use('/characters', charactersRouter);

export default authRouter;