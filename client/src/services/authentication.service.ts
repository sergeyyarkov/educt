import { BehaviorSubject, Observable } from 'rxjs';
import { ApolloClient } from '@apollo/client';
import Cookies from 'js-cookie';

interface IAuthenticationService {
  currentUserSubject: BehaviorSubject<any>;
}

class AuthenticationService {
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  public constructor({ currentUserSubject }: IAuthenticationService) {
    this.currentUserSubject = currentUserSubject;
    this.currentUser = currentUserSubject.asObservable();
  }

  public logout(client: ApolloClient<object>) {
    Cookies.remove('user');
    currentUserSubject.next(null);
    client.resetStore();
  }

  public getCurrentUserValue() {
    return this.currentUserSubject.value;
  }
}

const currentUserSubject = new BehaviorSubject(Cookies.getJSON('user'));

export default new AuthenticationService({ currentUserSubject });
