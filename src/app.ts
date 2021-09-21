import express from 'express';
import http from 'http';
import config from './config';

import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

async function startServer() {
	const app = express();
	const httpServer = http.createServer(app);

	const server = new ApolloServer({
		typeDefs: gql`
			type Query {
				hello: String
			}
		`,
		resolvers: {
			Query: {
				hello: () => 'Suck it bitch'
			}
		},
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
	});

	await server.start();

	server.applyMiddleware({ app });

	(await import('./loaders')).default({ app });

	httpServer
		.listen(config.port, () => {
			console.log(
				`
            ###########################
            server running on port ${config.port}
            ###########################
            `
			);
		})
		.on('error', error => {
			console.log(error);
			process.exit(1);
		});
}

startServer();
