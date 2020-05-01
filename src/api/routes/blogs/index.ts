import { Router } from 'express';
import blogs from './blogs';

const route = Router();

export default (app: Router) => {
    app.use('/blogs', route);
    
    blogs(route);
};