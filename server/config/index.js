import { config } from 'dotenv';

const envFound = config();
if (!envFound) {
	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
	port: parseInt(process.env.PORT, 10),
	mysql: {
		connectionLimit: parseInt(process.env.DB_LIMIT, 10),
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_SCHEMA
	},
	jwtSecret: process.env.JWT_SECRET,
	logs: {
		level: process.env.LOG_LEVEL || 'silly'
	},
	api: {
		prefix: process.env.API_PREFIX
	}
};
