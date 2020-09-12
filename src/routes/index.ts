import { Router } from 'express';
import auth from './auth';

export default () => {
    const app = Router();

    auth(app);

    return app;
}