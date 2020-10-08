import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthenticationService from './services/authentication.service';

const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });

const authLink = setContext((_, { headers }) => {
  const user = AuthenticationService.getCurrentUserValue();

  if (user) {
    const token = user.token;

    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : null,
      },
    };
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client