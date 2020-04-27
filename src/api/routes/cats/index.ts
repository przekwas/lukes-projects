import { Router } from 'express';
import finds from './finds';

const route = Router();

export default (app: Router) => {
    app.use('/cats', route);
    
    finds(route);
};