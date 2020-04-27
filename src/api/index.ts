import { Router } from 'express';
import auth from './routes/auth';
import cats from './routes/cats';

export default () => {
    const app = Router();

    auth(app);

    cats(app);

    return app;
}