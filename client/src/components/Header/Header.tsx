import React from 'react';
import { authenticationService } from '../../services/authentication.service';
import { Link } from 'react-router-dom';
import {
  MdSchool,
  MdNotifications,
  MdSettings,
  MdExitToApp,
} from 'react-icons/md';
import {
  Flex,
  Box,
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
  Skeleton,
  useToast,
} from '@chakra-ui/core';
import { useApolloClient } from '@apollo/client';
import UserBadge from '../UserBadge/UserBadge';
import { useCurrentUserDataQuery, useLogoutMutation } from '../../__generated__/types';

const Header: React.FC = () => {
  const client = useApolloClient();
  const toast = useToast();
  const { data, loading, error } = useCurrentUserDataQuery()
  const [logout] = useLogoutMutation({
    onError: (error) => {
      toast({
        title: '❌ Произошла ошибка!',
        description: `${error.graphQLErrors[0].message}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  });

  const onLogout = async () => {
    try {
      await logout(); // clear cookies on server
      authenticationService.logout(client); // reset store on client
    } catch (error) {
      console.error(error);
    }
  };

  if (error) {
    console.error(error);
  }

  if (data?.me === null) {
    return null;
  }

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
        </Flex>
        <Flex alignItems="center">
          {loading ? (
            <>
              <Skeleton width="53px" height="40px" marginRight={3} />
              <Skeleton width="180px" height="40px" />
            </>
          ) : (
            <>
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
                    name={data?.me.name || ''}
                    src="https://bit.ly/broken-link"
                    marginRight={3}
                  />
                  <Text as="span" mr={2}>
                    {data?.me.name}
                  </Text>
                  <UserBadge roles={data?.me.roles} />
                </MenuButton>
                <MenuList mr="1rem">
                  <MenuGroup title={`${data?.me.fullname}`}>
                    <MenuDivider />
                    <Link to="/profile">
                      <MenuItem>
                        <Box as={MdSettings} mr={2} />
                        Мой профиль
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={onLogout}>
                      <Box as={MdExitToApp} mr={2} />
                      Выход
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
