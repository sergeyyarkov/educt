import { ApolloClient, ApolloLink, createHttpLink, NormalizedCacheObject } from '@apollo/client';
import { cache } from './cache'
import { setContext } from '@apollo/client/link/context';
import authenticationService from './services/authentication.service';

const httpLink: ApolloLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });
const authLink: ApolloLink = setContext((_, { headers }) => {
  const token = authenticationService.currentToken
  
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : null,
      },
    };
  }
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
  resolvers: {},
});

export default client