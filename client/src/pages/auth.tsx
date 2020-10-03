import React from 'react';
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import Auth from '../components/Auth/Auth'

const AuthPage: React.FC = () => {
  let history = useHistory()

  if (Cookies.getJSON('user')) {
    history.push('/')
  }

  return <Auth />
}

export default AuthPage

