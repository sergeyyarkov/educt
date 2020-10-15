import React from 'react';
import {
  Breadcrumb,
  Flex,
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Avatar,
  Button,
  Text,
  Badge,
  Heading,
  Skeleton,
  Divider,
} from '@chakra-ui/core';
import { IPageProps, IUserQueryData } from '../interfaces';
import { MdEdit } from 'react-icons/md';
import { useQuery } from '@apollo/react-components';
import GET_CURRENT_USER_DATA from '../graphql/queries/currentUserData';

const ProfilePage: React.FC<IPageProps> = ({ title }) => {
  const currentUser = useQuery<IUserQueryData>(GET_CURRENT_USER_DATA);

  return (
    <>
      <Breadcrumb fontWeight="medium" fontSize="sm">
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/courses">{title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box marginTop={10}>
        <Flex marginBottom={8}>
          <Box>
            <Avatar
              border="4px solid #E2E8F0"
              size="2xl"
              name={currentUser.data?.me.name}
              src="https://bit.ly/broken-link"
            />
          </Box>
          <Box marginLeft="60px">
            {currentUser.loading ? (
              <>
                <Skeleton width="500px" height="40px" marginBottom="5px" />
                <Skeleton width="400px" height="24px" marginBottom="5px" />
              </>
            ) : (
              <>
                <Heading as="h2" mb={1} fontWeight="600">
                  {currentUser.data?.me.name} {currentUser.data?.me.surname}{' '}
                  {currentUser.data?.me.patronymic}
                </Heading>
                <Flex alignItems="center" marginBottom="15px">
                  <Text color="blue.500">{currentUser.data?.me.email} - </Text>{' '}
                  {currentUser.data?.me.roles.includes('ADMIN') ? (
                    <Badge
                      marginLeft="5px"
                      variantColor="purple"
                      variant="solid"
                    >
                      {' '}
                      Преподаватель
                    </Badge>
                  ) : (
                    <Badge marginLeft="5px" variantColor="blue" variant="solid">
                      Ученик
                    </Badge>
                  )}
                </Flex>
              </>
            )}
          </Box>
          <Box marginLeft="auto" marginTop="auto">
            {currentUser.loading ? (
              <Skeleton width="160px" height="35px" />
            ) : (
              <Button leftIcon={MdEdit} variantColor="blue" borderRadius="30px">
                Редактировать
              </Button>
            )}
          </Box>
        </Flex>
        <Divider />
      </Box>
    </>
  );
};

export default ProfilePage;
