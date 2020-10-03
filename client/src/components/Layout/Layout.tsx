import React from 'react'
import Header from '../Header/Header'
import Nav from '../Nav/Nav'

const Layout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Nav />
      {children}
    </React.Fragment>
  )
}

export default Layout