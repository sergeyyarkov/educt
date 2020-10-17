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
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Input,
  FormControl,
} from '@chakra-ui/core';
import { IPageProps, IUserQueryData } from '../interfaces';
import { MdEdit } from 'react-icons/md';
import { useQuery } from '@apollo/react-components';
import GET_CURRENT_USER_DATA from '../graphql/queries/currentUserData';

const ProfilePage: React.FC<IPageProps> = ({ title }) => {
  const currentUser = useQuery<IUserQueryData>(GET_CURRENT_USER_DATA);

  if (currentUser.error) {
    console.log(currentUser.error)
  }

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
              <Button leftIcon={MdEdit} variantColor="blue" rounded='9999px'>
                Редактировать
              </Button>
            )}
          </Box>
        </Flex>
        <Divider />
        <Tabs variant="soft-rounded" variantColor="blue" marginTop={5}>
          <TabList>
            <Tab>Информация о профиле</Tab>
            <Tab>Доступные курсы</Tab>
          </TabList>
          <TabPanels>
            <TabPanel marginTop={5}>
              <Flex alignItems='center'>
                
                  <Text>Логин</Text>
                
                {currentUser.loading ? null : (
                  <FormControl>
                    <Input isReadOnly value={currentUser.data?.me.login} />
                  </FormControl>
                )}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Box>

              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default ProfilePage;
