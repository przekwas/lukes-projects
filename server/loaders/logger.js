const winston = require('winston');
const config = require('../config');

const transports = [];
if (process.env.NODE_ENV === 'production') {
	transports.push(new winston.transports.Console());
	transports.push(new winston.transports.File({ filename: 'app.log' }));
} else {
	transports.push(
		new winston.transports.Console({
			level: 'silly',
			format: winston.format.combine(winston.format.cli(), winston.format.splat())
		})
	);
}

const LoggerInstance = winston.createLogger({
	level: config.logs.level,
	levels: winston.config.npm.levels,
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.json()
	),
	transports
});

module.exports = LoggerInstance;
