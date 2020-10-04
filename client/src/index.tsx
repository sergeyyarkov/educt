import React from 'react';
import ReactDOM from 'react-dom';
import AuthenticationService from './services/authentication.service';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });

const authLink = setContext((_, { headers }) => {
  const user = AuthenticationService.getCurrentUserValue();

  if (user) {
    console.log(user);
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

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
