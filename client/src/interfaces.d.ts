import { RouteProps } from 'react-router-dom';
import { IconType } from 'react-icons';
import { MutationResult } from '@apollo/client';
import { BehaviorSubject } from 'rxjs';

export interface IPageProps {
  title?: string;
}

export interface IPrivateRouteProps extends RouteProps {
  component: React.FC<any>;
  title?: string;
}

export interface IArticlesProps {
  articles: any[];
}

export interface INavLinksProps {
  links: {
    location: string;
    title: string;
    icon: IconType;
  }[];
}

export interface IUserQueryData {
  me: {
    slug: string;
    name: string;
    surname: string;
    patronymic: string;
    login: string;
    email: string;
    password: string;
    roles: string[];
    __typename: string;
  };
}

export interface IAuthData {
  _id: string;
  name: string;
  surname: string;
  patronymic: string;
  roles: string[];
  token: string;
  tokenExpiration: number;
  loading: boolean | undefined;
  __typename: string;
}

export interface IAuthenticationService {
  currentTokenSubject: BehaviorSubject<any>;
}
