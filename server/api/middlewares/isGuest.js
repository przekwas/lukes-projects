const logger = require('../../loaders/logger');

module.exports = (req, res, next) => {
    if (req.user && req.user.role === 'guest') {
        next();
    } else {
        logger.warn('token didnt exist or verify');
        res.sendStatus(401);
    }
}