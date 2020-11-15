import { RouteProps } from 'react-router-dom';
import { IconType } from 'react-icons';

export type LinkType = {
  location: string;
  title: string;
  icon: IconType;
};

export interface IPageProps {
  title?: string;
}

export interface IPrivateRouteProps extends RouteProps {
  component: React.FC<any>;
  title?: string;
}

export interface INavLinksProps {
  links: LinkType[]
}
