import Cookies from 'js-cookie';
import { ApolloClient } from '@apollo/client';
import { isLoggedInVar } from '../cache';

class AuthenticationService {
  public logout(client: ApolloClient<object>): void {
    Cookies.remove('logged_in');
    isLoggedInVar(false);
    client.resetStore();
  }

  public setUserLoggedIn(): void {
    document.cookie = `logged_in=true`;
    isLoggedInVar(true);
  }
}

const authenticationService = new AuthenticationService();

export { authenticationService };
