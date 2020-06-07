import { Router } from 'express';
import enchants from './enchants';

const route = Router();

export default (app: Router) => {
    app.use('/enchanter', route);
    
    enchants(route);
};