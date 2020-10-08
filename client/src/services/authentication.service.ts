import { BehaviorSubject, Observable } from 'rxjs';
import { ApolloClient } from '@apollo/client';
import { IAuthenticationService } from '../interfaces';
import Cookies from 'js-cookie';

class AuthenticationService {
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  public constructor({ currentUserSubject }: IAuthenticationService) {
    this.currentUserSubject = currentUserSubject;
    this.currentUser = currentUserSubject.asObservable();
  }

  public isAuthenticated() {
    return Boolean(Cookies.getJSON('user'))
  }

  public logout(client: ApolloClient<object>) {
    Cookies.remove('user');
    currentUserSubject.next(null);
    client.resetStore();
  }

  public getCurrentUserValue() {
    return this.currentUserSubject.value;
  }

  public setUserValue(userData: any) {
    this.currentUserSubject.next(userData)
    document.cookie = `user=${JSON.stringify(userData)}`;
  }
}

const currentUserSubject = new BehaviorSubject(Cookies.getJSON('user'));

export default new AuthenticationService({ currentUserSubject });
