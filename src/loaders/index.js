const expressLoader = require('./express');
const mysqlLoader = require('./mysql');
const passportLoader = require('./passport');
const Logger = require('./logger');

module.exports = async ({ expressApp }) => {
	await mysqlLoader.connect();
	Logger.info('✌️ DB loaded and connected!');
	
	await passportLoader({ app: expressApp });
	Logger.info('✌️ Passport loaded');

	await expressLoader({ app: expressApp });
	Logger.info('✌️ Express loaded');

};
