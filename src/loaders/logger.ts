import winston from 'winston';
import config from '../config';

const transports = [];
if (process.env.NODE_ENV === 'development') {
	transports.push(new winston.transports.Console());
} else {
	transports.push(
		new winston.transports.Console({
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
		winston.format.splat(),
		winston.format.json(),
		winston.format.errors({ stack: true }),
	),
	transports
});

export const stream = {
    write: (text: string) => LoggerInstance.http(text)
}

export default LoggerInstance;
