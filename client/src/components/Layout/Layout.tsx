import React from 'react'
import { Box } from '@chakra-ui/core'
import Header from '../Header/Header'
import Nav from '../Nav/Nav'

const Layout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Nav />
      <Box paddingLeft='18rem' marginTop='4rem'>
        <Box as='main' marginRight='auto' marginLeft='auto' maxWidth='95rem' paddingLeft={5} paddingRight={5} paddingTop='2rem'>
          {children} 
        </Box> 
      </Box>
    </React.Fragment>
  )
}

export default Layout