import {
	GraphQLID,
	GraphQLString,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLNullableType
} from 'graphql';

export default new GraphQLObjectType({
	name: 'pickem_teams',
	description: 'nfl teams',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		name: {
			type: new GraphQLNonNull(GraphQLString)
		},
		city: {
			type: new GraphQLNonNull(GraphQLString)
		},
		conference: {
			type: new GraphQLNonNull(GraphQLString)
		},
		division: {
			type: new GraphQLNonNull(GraphQLString)
		},
		full_name: {
			type: new GraphQLNonNull(GraphQLString)
		},
		primary_color: {
			type: new GraphQLNonNull(GraphQLString)
		},
		secondary_color: {
			type: new GraphQLNonNull(GraphQLString)
		},
		tertiary_color: {
			type: new GraphQLNonNull(GraphQLString)
		},
		quatenary_color: {
			type: new GraphQLNonNull(GraphQLString)
		},
		wiki_logo_url: {
			type: new GraphQLNonNull(GraphQLString)
		},
		stadium_name: {
			type: new GraphQLNonNull(GraphQLString)
		}
	}
});

// type Team {
//     id: String!
//     name: String!
//     city: String!
//     conference: String!
//     division: String!
//     full_name: String!
//     primary_color: String!
//     secondary_color: String!
//     tertiary_color: String
//     quatenary_color: String
//     wiki_logo_url: String!
//     stadium_name: String!
// }
