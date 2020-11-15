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
} from '@chakra-ui/react';
import { IPageProps } from '../interfaces';

import ProfileForm from '../components/ProfileForm/ProfileForm';
import ProfileInfo from '../components/ProfileInfo/ProfileInfo';
import ChangePasswdForm from '../components/ChangePasswdForm/ChangePasswdForm';
import { useCurrentUserDataQuery } from '../__generated__/types';

const ProfilePage: React.FC<IPageProps> = ({ title }) => {
  const { data, error } = useCurrentUserDataQuery()

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
        <ProfileInfo />
        <Divider />
        <Tabs variant="soft-rounded" colorScheme="blue" marginTop={5}>
          <TabList>
            <Tab>Мой профиль</Tab>
            <Tab>Изменить пароль</Tab>
            <Tab>Доступные курсы</Tab>
          </TabList>
          <TabPanels mt="20px">
            <TabPanel>
              <Flex>
                <ProfileForm />
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
