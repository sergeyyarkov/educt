import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthenticationService from './services/authentication.service';

const httpLink: ApolloLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });

const authLink: ApolloLink = setContext((_, { headers }) => {
  const token = AuthenticationService.getCurrentTokenValue()

  if (token) {
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : null,
      },
    };
  }
});

const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});

export default client