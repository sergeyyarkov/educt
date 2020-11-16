import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import NavLink from './NavLink';
import config from '../../config';
import { Flex, Box } from '@chakra-ui/react';

/**
 *
 * Nav component
 * Component for navigating the application.
 *
 */

export type ActiveLinkState = {
  title: string | null;
};

const Nav: React.FC = () => {
  const [activeLink, setActiveLink] = useState<ActiveLinkState>({
    title: null,
  });
  const history = useHistory();

  const handleRoute = (location: string): void => history.push(location);
  const handleOnHoverLink = (title: string): void => setActiveLink({ title });
  const handleOnLeaveLink = (): void => setActiveLink({ title: null });

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
          {config.links.map((link, i) => (
            <NavLink
              handleOnHoverLink={handleOnHoverLink}
              handleOnLeaveLink={handleOnLeaveLink}
              handleRoute={handleRoute}
              activeLink={activeLink}
              history={history}
              link={link}
              key={i}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Nav;
