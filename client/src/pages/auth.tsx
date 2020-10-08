import React from 'react';
import Helmet from 'react-helmet';
import Auth from '../components/Auth/Auth';
import authenticationService from '../services/authentication.service';
import { RouteComponentProps } from 'react-router-dom';

const AuthPage: React.FC<RouteComponentProps> = ({ history }) => {
  if (authenticationService.isAuthenticated()) {
    history.push('/');
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
