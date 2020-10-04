import React from 'react';
import Cookies from 'js-cookie'
import Helmet from 'react-helmet'
import Auth from '../components/Auth/Auth'
import { RouteComponentProps } from 'react-router-dom';

const AuthPage: React.FC<RouteComponentProps> = ({ history }) => {
  if (Cookies.getJSON('user')) {
    history.push('/')
  }

  return (
    <>
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <Auth />
    </>
  )
}

export default AuthPage

