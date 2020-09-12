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
		level: process.env.LOGS_LEVEL
	},
	knex: {
		client: process.env.KNEX_CLIENT,
		connection: {
			host: process.env.KNEX_HOST,
			user: process.env.KNEX_USER,
			password: process.env.KNEX_PASS,
			database: process.env.KNEX_SCHEMA
		},
		pool: {
			min: 0,
			max: parseInt(process.env.KNEX_LIMIT)
		}
	}
};
