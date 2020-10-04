import React from 'react';
import Cookies from 'js-cookie';
import Helmet from 'react-helmet';
import Layout from '../Layout/Layout';
import { Route, Redirect } from 'react-router-dom';
import { PrivateRouteProps } from '../../interfaces';

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  component: Component,
  title,
  ...options
}) => {
  return (
    <Route
      {...options}
      render={(props) =>
        Cookies.getJSON('user') ? (
          <Layout>
            <Helmet>
              <title>{title} • Educt </title>
            </Helmet>
            <Component {...props} title={title} />
          </Layout>
        ) : (
          <Redirect
            to={{ pathname: '/auth', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
