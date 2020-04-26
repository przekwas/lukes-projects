import { Router } from 'express';
import auth from './routes/auth';
import test from './routes/test';

export default () => {
    const app = Router();

    auth(app);

    test(app);

    return app;
}