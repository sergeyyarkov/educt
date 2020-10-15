import React from 'react';
import Helmet from 'react-helmet';
import Auth from '../components/Auth/Auth';
import { RouteComponentProps } from 'react-router-dom';

import { isLoggedInVar } from '../cache'

const AuthPage: React.FC<RouteComponentProps> = ({ history }) => {
  const isLoggedIn = isLoggedInVar()

  if (isLoggedIn) {
    history.push('/')
  }

  return (
    <>
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <Auth />
    </>
  );
};

export default AuthPage;
