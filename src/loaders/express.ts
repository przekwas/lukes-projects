import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import routes from '../routes';
import config from '../config';
import { globalErrorHandler, notFoundHandler } from '../middlewares';
import { errors } from 'celebrate';

import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { Query } from '../db';

const schema = buildSchema(`
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

const root = {
	hello: () => {
		return 'suck it bitch';
	},
	getTeams: () => Query('SELECT * FROM pickem_teams').then(data => data)
};

export default async function ({ app }: { app: Application }) {
	// status checkpoints
	app.get('/status', (req, res) => res.status(200).end());
	app.head('/status', (req, res) => res.status(200).end());

	app.enable('trust proxy');

	app.use(cors());
	app.use(helmet());
	app.use(compression());
	app.use(express.json());
	app.use(morgan(config.logs.morgan));

	app.use(
		'/graphql',
		graphqlHTTP({
			schema: schema,
			rootValue: root,
			graphiql: true
		})
	);

	app.use(config.api.prefix, routes);

	app.use(errors());

	app.use(notFoundHandler);
	app.use(globalErrorHandler);
}
