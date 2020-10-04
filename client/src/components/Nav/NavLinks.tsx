import React from 'react';
import { Link } from 'react-router-dom';
import { Box, PseudoBox } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import { NavLinksProps } from '../../interfaces';

const NavLinks: React.FC<NavLinksProps> = ({ links }) => {
  const history = useHistory();

  return (
    <>
      {links.map((link: any, i) => {
        return (
          <Link key={i} to={link.location}>
            <PseudoBox
              background={
                history.location.pathname === link.location ? '#2A69AC' : null
              }
              color={history.location.pathname === link.location ? '#fff' : ''}
              mb={2}
              alignItems="center"
              borderRadius="17px"
              display="flex"
              padding="10px"
              _hover={
                history.location.pathname !== link.location
                  ? { background: '#EDF2F7' }
                  : {}
              }
            >
              <Box as={link.icon} size="21px" mr={3} />
              {link.title}
            </PseudoBox>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
