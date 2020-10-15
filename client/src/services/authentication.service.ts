import Cookies from 'js-cookie';
import { ApolloClient, FetchResult, MutationFunctionOptions } from '@apollo/client';
import { isLoggedInVar, tokenVar } from '../cache'

class AuthenticationService {
  public currentToken: string | undefined | null;

  public constructor() {
    this.currentToken = tokenVar();
  }

  public logout(client: ApolloClient<object>): void {
    Cookies.remove('token');
    isLoggedInVar(false);
    tokenVar(null);
    client.resetStore();
  }

  public async login(login: (options: MutationFunctionOptions<any, Record<string, any>>) => Promise<FetchResult<any>>, options: MutationFunctionOptions<any, Record<string, any>>) {
    return await login(options)
  }

  public setTokenValue(token: string) {
    document.cookie = `token=${token}`;
    isLoggedInVar(true)
    tokenVar(token);
    this.currentToken = token;
  }
}

export default new AuthenticationService();
