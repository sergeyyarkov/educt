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

export interface IAuthenticationService {
  currentUserSubject: BehaviorSubject<any>;
}
