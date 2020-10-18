import React, { useState } from 'react';
import { Box } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import { INavLinksProps } from '../../interfaces';

const NavLinks: React.FC<INavLinksProps> = ({ links }) => {
  const [activeLink, setActiveLink] = useState<{ title: string | null }>({
    title: null,
  });
  const history = useHistory();

  const handleRoute = (location: string): void => history.push(location);
  const handleOnHoverLink = (title: string): void => setActiveLink({ title });
  const handleOnLeaveLink = (): void => setActiveLink({ title: null });

  return (
    <>
      {links.map((link, i) => {
        return (
          <Box
            as="a"
            onMouseEnter={() => handleOnHoverLink(link.title)}
            onMouseLeave={handleOnLeaveLink}
            onClick={() => handleRoute(link.location)}
            key={i}
            display="flex"
            margin="3px 0"
            width="100%"
            border="none"
            aria-label={link.title}
            role="link"
            cursor="pointer"
          >
            <Box
              color={
                history.location.pathname === link.location ||
                activeLink.title === link.title
                  ? 'blue.500'
                  : ''
              }
              backgroundColor={activeLink.title === link.title ? '#EBF8FF' : ''}
              alignItems="center"
              borderRadius="9999px"
              display="flex"
              padding="10px 15px"
              fontWeight="500"
              transition="all .1s"
            >
              <Box as={link.icon} size="26px" mr={3} />
              {link.title}
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default NavLinks;
