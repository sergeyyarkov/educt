import Cookies from 'js-cookie';
import { InMemoryCache } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar();
        }
      },
    },
  },
});

export const isLoggedInVar = cache.makeVar<boolean>(!!Cookies.get('signedin'));;
