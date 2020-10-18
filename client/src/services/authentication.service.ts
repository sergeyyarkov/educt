import Cookies from 'js-cookie';
import {
  ApolloClient,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client';
import { isLoggedInVar } from '../cache';

class AuthenticationService {
  public logout(client: ApolloClient<object>): void {
    Cookies.remove('logged_in');
    isLoggedInVar(false);
    client.resetStore();
  }

  public async login(
    login: (
      options: MutationFunctionOptions<any, Record<string, any>>
    ) => Promise<FetchResult<any>>,
    options: MutationFunctionOptions<any, Record<string, any>>
  ) {
    return await login(options);
  }

  public setUserLoggedIn() {
    document.cookie = `logged_in=true`;
    isLoggedInVar(true);
  }
}

export default new AuthenticationService();
