import 'graphql-import-node';
import typeDefs from './typeDefs/schema.graphql';
import resolvers from './resolvers/index';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
