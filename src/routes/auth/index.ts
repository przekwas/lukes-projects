import { Router } from 'express';
import register from './register';
import login from './login';

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);
    
    register(route);
    login(route);
}