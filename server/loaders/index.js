const expressLoader = require('./express');
const mysqlLoader = require('./mysql');
const Logger = require('./logger');

module.exports = async ({ expressApp }) => {
	const mysqlConnection = await mysqlLoader();
	Logger.info('✌️ DB loaded and connected!');

	await expressLoader({ app: expressApp });
	Logger.info('✌️ Express loaded');
};
