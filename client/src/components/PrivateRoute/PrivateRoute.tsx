import React from 'react';
import Cookies from 'js-cookie'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute: React.FC<any> = ({ children, ...options }) => {
  return (
    <Route 
      {...options}
      render={({ location }) => Cookies.get('token') 
      ? (children) 
      : <Redirect to={{ pathname: '/auth', state: { from: location } }} />}
    />
  )
}

export default PrivateRoute