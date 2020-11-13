import React from 'react';
import {
  Breadcrumb,
  Flex,
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Heading,
  Text,
} from '@chakra-ui/core';
import { IPageProps } from '../interfaces';
import { useQuery } from '@apollo/react-components';

import GET_CURRENT_USER_DATA from '../graphql/queries/currentUserData';
import { currentUserData } from '../graphql/queries/__generated__/currentUserData';
import ProfileForm from '../components/ProfileForm/ProfileForm';
import ProfileInfo from '../components/ProfileInfo/ProfileInfo';
import ChangePasswdForm from '../components/ChangePasswdForm/ChangePasswdForm';

const ProfilePage: React.FC<IPageProps> = ({ title }) => {
  const { data, loading, error } = useQuery<currentUserData>(
    GET_CURRENT_USER_DATA
  );

  if (error) {
    console.error(error);
    return (
      <>
        <Heading>Произошла ошибка:</Heading>
        <Text>{error.message}</Text>
      </>
    );
  }

  if (data?.me === null) {
    return null;
  }

  return (
    <>
      <Breadcrumb fontWeight="medium" fontSize="sm">
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/courses">{title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box marginTop={10}>
        <ProfileInfo data={data} loading={loading} />
        <Divider />
        <Tabs variant="soft-rounded" variantColor="blue" marginTop={5}>
          <TabList>
            <Tab>Мой профиль</Tab>
            <Tab>Изменить пароль</Tab>
            <Tab>Доступные курсы</Tab>
          </TabList>
          <TabPanels mt="20px">
            <TabPanel>
              <Flex>
                <ProfileForm data={data} loading={loading} />
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex>
                <ChangePasswdForm />
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default ProfilePage;
