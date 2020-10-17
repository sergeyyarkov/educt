import Cookies from 'js-cookie';
import {
  ApolloClient,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client';
import { isLoggedInVar } from '../cache';

class AuthenticationService {
  public currentToken: string | undefined | null;

  public logout(client: ApolloClient<object>): void {
    Cookies.remove('signedin');
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

  public setTokenValue(token: string) {
    document.cookie = `signedin=true`;
    isLoggedInVar(true);
    this.currentToken = token;
  }
}

export default new AuthenticationService();
