import {
  mergeResolvers,
  loadSchemaSync,
  loadFilesSync,
  GraphQLFileLoader,
  addResolversToSchema,
} from 'graphql-tools';
import { GraphQLSchema } from 'graphql';

const schema = loadSchemaSync(`${__dirname}/typeDefs/schema.graphql`, {
  loaders: [new GraphQLFileLoader()],
});
const resolvers = loadFilesSync(`${__dirname}/resolvers`);
const schemaWithResolvers: GraphQLSchema = addResolversToSchema({
  schema,
  resolvers: mergeResolvers(resolvers),
});

export default schemaWithResolvers;
