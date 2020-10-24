import React from 'react';
import { Flex, Box } from '@chakra-ui/core';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';

const Layout: React.FC = ({ children }) => {
  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Header />
      <Nav />
      <Box pl='18rem' mt="4rem" mb='4rem' flex="1 0 auto">
        <Box
          as="main"
          marginRight="auto"
          marginLeft="auto"
          maxWidth="85rem"
          paddingLeft={5}
          paddingRight={5}
          paddingTop="2rem"
          paddingBottom="2rem"
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
