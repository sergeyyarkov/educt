import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';

/**
 *
 * Layout component
 * Сomponent for rendering the current page.
 *
 */

const Layout: React.FC = ({ children }) => {
  return (
    <Flex minH="100vh" flexDirection="column">
      <Header />
      <Nav />
      <Box pl="18rem" mt="4rem" mb="4rem" flex="1 0 auto">
        <Box
          as="main"
          mr="auto"
          ml="auto"
          maxW="85rem"
          pl={5}
          pr={5}
          pt="2rem"
          pb="2rem"
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
