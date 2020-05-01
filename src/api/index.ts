import { Router } from 'express';
import auth from './routes/auth';
import cats from './routes/cats';
import blogs from './routes/blogs';

export default () => {
    const app = Router();

    auth(app);

    cats(app);

    blogs(app);

    return app;
}