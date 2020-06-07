import dotenv from 'dotenv';

const envFound = dotenv.config();

if (!envFound) {
	throw new Error('⚠️ no .env file found ⚠️');
}

export default {
	port: parseInt(process.env.PORT),
	jwt: {
		secret: process.env.JWT_SECRET,
		issuer: process.env.JWT_ISSUER
	},
	api: {
		prefix: process.env.API_PREFIX
	},
	logs: {
		morgan: process.env.MORGAN_LEVEL,
		level: process.env.LOG_LEVEL
	},
	mysql: {
		connectionLimit: parseInt(process.env.DB_LIMIT),
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_SCHEMA
	},
	discord: {
		feragoBot: process.env.FERAGO_BOT,
		feragoPrefix: process.env.FERAGO_PREFIX
	}
};