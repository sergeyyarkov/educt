import { BehaviorSubject, Observable } from 'rxjs';
import { ApolloClient, FetchResult, MutationFunctionOptions } from '@apollo/client';
import { IAuthenticationService } from '../interfaces';
import Cookies from 'js-cookie';

class AuthenticationService {
  public currentTokenSubject: BehaviorSubject<any>;
  public currentToken: Observable<any>;

  public constructor({ currentTokenSubject }: IAuthenticationService) {
    this.currentTokenSubject = currentTokenSubject;
    this.currentToken = currentTokenSubject.asObservable();
  }

  public isAuthenticated(): boolean {
    return Boolean(Cookies.get('token'))
  }

  public logout(client: ApolloClient<object>): void {
    Cookies.remove('token');
    currentTokenSubject.next(null)
    client.resetStore();
  }

  public async login(login: (options: MutationFunctionOptions<any, Record<string, any>>) => Promise<FetchResult<any>>, options: MutationFunctionOptions<any, Record<string, any>>) {
    const loginData = await login(options)
    
    return loginData
  }

  public getCurrentTokenValue(): string {
    return this.currentTokenSubject.value;
  }

  public setTokenValue(token: string) {
    this.currentTokenSubject.next(token)
    document.cookie = `token=${token}`
  }
}

const currentTokenSubject: BehaviorSubject<any> = new BehaviorSubject(Cookies.get('token'))

export default new AuthenticationService({ currentTokenSubject });
