import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../Layout/Layout';
import { Route, Redirect } from 'react-router-dom';
import { IPrivateRouteProps } from '../../interfaces';
import { useReactiveVar } from '@apollo/react-components';

import { isLoggedInVar } from '../../cache';

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  children,
  component: Component,
  title,
  ...options
}) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar)

  return (
    <Route
      {...options}
      render={(props) =>
        isLoggedIn ? (    
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
