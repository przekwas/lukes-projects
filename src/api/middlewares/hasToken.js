const passport = require('passport');

module.exports = (req, res, next) => {
	return passport.authenticate('bearer', (err, user) => {
		if (err) {
			return next(err);
		} else if (user) {
			req.user = user;
		}

		return next();
	})(req, res, next);
};
