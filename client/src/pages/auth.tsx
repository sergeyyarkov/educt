import React from 'react';
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import Layout from '../components/Layout/Layout'
import Auth from '../components/Auth/Auth'

const AuthPage: React.FC<any> = () => {
  let history = useHistory()

  if (Cookies.get('token')) {
    history.push('/')
  }
  
  return (
    <Layout>
      <Auth />
    </Layout>
  )
}

export default AuthPage

