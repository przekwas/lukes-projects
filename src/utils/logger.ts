import winston from 'winston';
import { config } from '../config';

const { combine, timestamp, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});

const transports = [];

if (process.env.NODE_ENV !== 'development') {
	transports.push(
		new winston.transports.Console({
			format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.json())
		})
	);
} else {
	transports.push(
		new winston.transports.Console({
			format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat)
		})
	);
}

const logger = winston.createLogger({
	level: config.logger.logLevel,
	transports
});

const stream = {
	write: (message: string) => {
		// use the 'info' log level so the output will be picked up by both transports
		logger.info(message.trim());
	}
};

export { logger, stream };
