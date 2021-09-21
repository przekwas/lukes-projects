import express from 'express';
import config from './config';

import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { Query } from './db';

var schema = buildSchema(`
  type Team {
    id: String!
    name: String!
    city: String!
    conference: String!
    division: String!
    full_name: String!
    primary_color: String!
    secondary_color: String!
    tertiary_color: String
    quatenary_color: String
    wiki_logo_url: String!
    stadium_name: String!
  }

  type Query {
    hello: String,
	getTeams: [Team]
  }
`);

var root = {
	hello: () => {
		return 'suck it bitch';
	},
	getTeams: () => Query('SELECT * FROM pickem_teams').then(data => data)
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
