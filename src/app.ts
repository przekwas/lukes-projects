import express from 'express';
import config from './config';

import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = {
	hello: () => {
		return 'suck it bitch';
	}
};

async function startServer() {
	const app = express();

	app.use(
		'/graphql',
		graphqlHTTP({
			schema: schema,
			rootValue: root,
			graphiql: true
		})
	);

	(await import('./loaders')).default({ app });

	app.listen(config.port, () => {
		console.log(
			`
            ###########################
            server running on port ${config.port}
            ###########################
            `
		);
	}).on('error', error => {
		console.log(error);
		process.exit(1);
	});
}

startServer();
