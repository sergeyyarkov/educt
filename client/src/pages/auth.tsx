import React from 'react';
import Cookies from 'js-cookie'
import Helmet from 'react-helmet'
import { useHistory } from "react-router-dom";
import Auth from '../components/Auth/Auth'

const AuthPage: React.FC = () => {
  let history = useHistory()

  if (Cookies.getJSON('user')) {
    history.push('/')
  }

  return (
    <>
      <Helmet>
        <title>Вход в Educt</title>
      </Helmet>
      <Auth />
    </>
  )
}

export default AuthPage

