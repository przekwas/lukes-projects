import { Router } from 'express';
import auth from './routes/auth';
import cats from './routes/cats';
import blogs from './routes/blogs';
import enchanter from './routes/enchanter';

export default () => {
    const app = Router();

    auth(app);

    cats(app);

    blogs(app);

    enchanter(app);

    return app;
}