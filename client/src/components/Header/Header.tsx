import React from 'react';
import AuthenticationService from '../../services/authentication.service';
import { Link, useHistory } from 'react-router-dom';
import {
  MdSchool,
  MdNotifications,
  MdSettings,
  MdExitToApp,
} from 'react-icons/md';
import {
  Flex,
  Box,
  Badge,
  Heading,
  Text,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/core';
import { useApolloClient } from '@apollo/client';

const Header: React.FC = () => {
  const user = React.useState(AuthenticationService.getCurrentUserValue());

  const history = useHistory();
  const client = useApolloClient();

  const handleLogout = () => {
    AuthenticationService.logout(client);
    history.push('/auth');
  };

  return (
    <Box
      as="header"
      background="#fff"
      position="fixed"
      top={0}
      left={0}
      right={0}
      borderBottomWidth={1}
      width="100%"
      height="4rem"
      zIndex={4}
    >
      <Flex
        justifyContent="space-between"
        width="100%"
        height="100%"
        alignItems="center"
        paddingLeft="1.5rem"
        paddingRight="1.5rem"
      >
        <Flex alignItems="center">
          <Box as={MdSchool} size={10} color="blue.600" marginRight={4} />
          <Box lineHeight="12px">
            <Heading as="p" fontSize="2xl" color="gray.700">
              Educt
            </Heading>
            <Text as="small">Learn management system</Text>
          </Box>
          <Box marginTop="auto" marginLeft={5}>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=sergeyyarkov&repo=educt&type=star&count=true"
              frameBorder="0"
              scrolling="0"
              width="150"
              height="20"
              title="GitHub"
            />
          </Box>
        </Flex>
        <Flex alignItems="center">
          <Button
            marginRight={3}
            variant="solid"
            outline="none"
            border="none"
            _after={{
              content: '"2"',
              display: 'block',
              position: 'absolute',
              top: '8px',
              right: '10px',
              background: '#E53E3E',
              color: '#fff',
              fontSize: '11px',
              width: '15px',
              height: '15px',
              borderRadius: '100%',
            }}
          >
            <Box as={MdNotifications} size="21px" />
          </Button>
          <Menu>
            <MenuButton as={Button} pr={6}>
              <Avatar
                size="sm"
                name={user[0].name}
                src="https://bit.ly/broken-link"
                marginRight={3}
              />
              <Text as="span" mr={2}>
                {user[0].name}
              </Text>
              <Badge variantColor="blue" variant="solid">
                Ученик
              </Badge>
            </MenuButton>
            <MenuList mr="1rem">
              <MenuGroup title={`User Surname Patronymic`}>
                <MenuDivider />
                <Link to="/profile">
                  <MenuItem>
                    <Box as={MdSettings} mr={2} />
                    Мой профиль
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>
                  <Box as={MdExitToApp} mr={2} />
                  Выход
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
