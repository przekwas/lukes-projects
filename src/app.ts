import express from 'express';
import { config } from './config';

async function startServer() {
	const app = express();

	(await import('./loaders')).loaders({ app });

	app.listen(config.port, () =>
		console.log(`
    ###########################
    server running on port ${config.port}
    ###########################
    `)
	).on('error', error => {
		console.log(error);
		process.exit(1);
	});
}

startServer();
