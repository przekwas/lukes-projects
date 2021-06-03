import dotenv from 'dotenv';

dotenv.config();

export default {
	port: parseInt(process.env.PORT),
	jwt: {
		secret: process.env.JWT_SECRET,
		issuer: process.env.JWT_ISSUER,
		expiresIn: process.env.JWT_EXPIRES
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
	discordBot: {
		appId: process.env.DISCORD_APP_ID,
		publicKey: process.env.DISCORD_PUBLIC_KEY,
		prefix: process.env.DISCORD_PREFIX,
		token: process.env.DISCORD_TOKEN
	}
};
