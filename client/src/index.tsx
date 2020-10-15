import React from 'react';
import ReactDOM from 'react-dom';
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
