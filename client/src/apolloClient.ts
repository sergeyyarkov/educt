import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client';
import { cache } from './cache';

const httpLink: ApolloLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: httpLink,
  resolvers: {},
});

export default client;
