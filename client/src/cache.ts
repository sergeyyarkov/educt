import Cookies from 'js-cookie'
import { InMemoryCache } from '@apollo/client'

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar()
        },
        token() {
          return tokenVar()
        }
      }
    }
  }
});

export const isLoggedInVar = cache.makeVar<boolean>(!!Cookies.get('token'))
export const tokenVar = cache.makeVar<string | undefined | null>(Cookies.get('token') || null)