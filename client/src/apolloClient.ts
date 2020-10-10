import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
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

const client: ApolloClient<any> = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client