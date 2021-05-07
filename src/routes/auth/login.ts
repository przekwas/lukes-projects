import { Router } from 'express';
import { createToken } from '../../utils/tokens';
import { handleLogin } from '../../middlewares';

const loginRouter = Router();

loginRouter.post('/', handleLogin, async (req, res, next) => {
    try {
        const { id, username, email, role, banned } = req.currentUser;
        const token = createToken({ id, username, email, role, banned });
        res.json(token);
    } catch (error) {
        next(error);
    }
});

export default loginRouter;
