import Cookies from 'js-cookie';
import {
  ApolloClient,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client';
import { isLoggedInVar } from '../cache';
import {
  Login,
  LoginVariables,
} from '../graphql/mutations/__generated__/Login';

class AuthenticationService {
  public logout(client: ApolloClient<object>): void {
    Cookies.remove('logged_in');
    isLoggedInVar(false);
    client.resetStore();
  }

  public async login(
    login: (
      options: MutationFunctionOptions<any, Record<string, any>>
    ) => Promise<FetchResult<Login>>,
    variables: LoginVariables
  ) {
    return await login({ variables });
  }

  public setUserLoggedIn() {
    document.cookie = `logged_in=true`;
    isLoggedInVar(true);
  }
}

const authenticationService = new AuthenticationService();

export { authenticationService };
