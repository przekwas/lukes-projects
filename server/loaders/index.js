const expressLoader = require('./express');
const mysqlLoader = require('./mysql');
const Logger = require('./logger');

module.exports = async ({ expressApp }) => {
	await mysqlLoader.connect();
	Logger.info('✌️ DB loaded and connected!');

	await expressLoader({ app: expressApp });
	Logger.info('✌️ Express loaded');
};