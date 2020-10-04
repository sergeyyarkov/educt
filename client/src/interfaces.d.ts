import { RouteProps } from 'react-router-dom'
import { IconType } from 'react-icons'

export interface PageProps {
  title?: string;
}

export interface PrivateRouteProps extends RouteProps {
  component: React.FC<any>;
  title?: string;
}

export interface ArticlesProps {
  articles: any[]
}

export interface NavLinksProps {
  links: {
    location: string;
    title: string;
    icon: IconType;
  }[]
}