import dotenv from 'dotenv';

dotenv.config();

const config = {
	mysql: {
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		host: process.env.DB_HOST,
		database: process.env.DB_SCHEMA,
		connectionLimit: Number(process.env.DB_LIMIT),
		dateStrings: process.env.DB_DATESTRINGS === 'true',
		timezone: process.env.DB_TIMEZONE
	},
	api: {
		prefix: process.env.API_PREFIX as string
	},
	jwt: {
		secret: process.env.JWT_SECRET as string,
		issuer: process.env.JWT_ISSUER,
		algorithm: process.env.JWT_ALGO,
		expiresIn: process.env.JWT_EXPIRES
	},
	logger: {
		morganLevel: process.env.MORGAN_LEVEL as string,
		logLevel: process.env.LOG_LEVEL
	},
	server: {
		port: Number(process.env.PORT)
	},
	discord: {
		appId: process.env.DISCORD_APP_ID,
		publicKey: process.env.DISCORD_PUBLIC_KEY,
		token: process.env.DISCORD_TOKEN,
		prefix: process.env.DISCORD_PREFIX
	}
};

export { config };
