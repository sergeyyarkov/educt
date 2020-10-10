import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../Layout/Layout';
import { Route, Redirect } from 'react-router-dom';
import { IPrivateRouteProps } from '../../interfaces';
import { UserProvider } from '../../context/user.context'
import authenticationService from '../../services/authentication.service';

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  children,
  component: Component,
  title,
  ...options
}) => {
  return (
    <Route
      {...options}
      render={(props) =>
        authenticationService.isAuthenticated() ? (
          <UserProvider token={authenticationService.getCurrentTokenValue()}>
            <Layout>
              <Helmet>
                <title>{title} • Educt </title>
              </Helmet>
              <Component {...props} title={title} />
            </Layout>
          </UserProvider>
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
