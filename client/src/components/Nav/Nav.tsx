import React from 'react';
import NavLinks from './NavLinks';
import config from '../../config';
import { Flex, Box } from '@chakra-ui/react';

/**
 *
 * Nav component
 * Component for navigating the application.
 *
 */

const Nav: React.FC = () => {
  return (
    <Box
      display="block"
      position="fixed"
      left={0}
      right={0}
      top={0}
      width="100%"
      height="100%"
      maxWidth="18rem"
    >
      <Box top="4rem" position="relative" overflowY="auto" borderRightWidth={1}>
        <Flex
          as="nav"
          flexDirection="column"
          alignItems="flex-start"
          textDecoration="none"
          height="calc(100vh - 4rem)"
          padding="1.5rem 1.2rem"
        >
          <NavLinks links={config.links} />
        </Flex>
      </Box>
    </Box>
  );
};

export default Nav
