import React from 'react';
import { Box } from '@chakra-ui/react'
import { History } from 'history'
import { ActiveLinkState } from './NavLinks';
import { LinkType } from '../../interfaces';

/**
 *
 * NavLink component
 * Returns the component for navigation
 *
 */

interface NavLinkProps { 
  handleOnHoverLink: (title: string) => void,
  handleOnLeaveLink: () => void,
  handleRoute: (location: string) => void,
  history: History,
  activeLink: ActiveLinkState,
  link: LinkType
}

const NavLink: React.FC<NavLinkProps> = ({ handleOnHoverLink, handleOnLeaveLink, handleRoute, history, activeLink, link }) => {
  const onMouseEnter = () => handleOnHoverLink(link.title)
  const onClick = () => handleRoute(link.location)

  return (
    <Box
      as="a"
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleOnLeaveLink}
      onClick={onClick}
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
        <Box as={link.icon} boxSize="26px" mr={3} />
        {link.title}
      </Box>
    </Box>
  )
}

export default NavLink