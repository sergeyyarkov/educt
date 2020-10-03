import React from 'react';
import Cookies from 'js-cookie'
import { Route, Redirect, RouteProps } from 'react-router-dom'

interface PrivateRouteProps extends RouteProps {
  component: React.FC<any>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, component: Component, ...options }) => {
  return (
    <Route 
      {...options}
      render={props => Cookies.getJSON('user') 
      ? <Component {...props} /> 
      : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />}
    />
  )
}

export default PrivateRoute