import { Router } from 'express';
import chirperRouter from './chirper';
import bastionRouter from './bastion';
import pickemRouter from './pickem';
import usersRouter from './users';

const apiRouter = Router();

apiRouter.use('/chirper', chirperRouter);
apiRouter.use('/bastion', bastionRouter);
apiRouter.use('/pickem', pickemRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;