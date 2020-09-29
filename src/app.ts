import config from './config';
import express from 'express';

async function startServer() {
	const app = express();

	app.listen(config.port, () => {
		console.log('Server Running on Port ' + config.port);
	}).on('error', error => {
		console.log(error);
		process.exit(1);
	});
}

startServer();