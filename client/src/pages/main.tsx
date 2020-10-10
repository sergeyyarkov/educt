import React from 'react';
import Articles from '../components/Articles/Articles';
import {
  Box,
  Heading,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/core';
import { IPageProps, IUserData } from '../interfaces';
import UserContext from '../context/user.context'

const MainPage: React.FC<IPageProps> = ({ title }) => {
  const user: IUserData = React.useContext<any>(UserContext)

  return (
    <>
      <Breadcrumb fontWeight="medium" fontSize="sm">
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/">{title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box marginTop={10}>
        <Box>
          <Text
            fontWeight={600}
            fontSize="md"
            color="blue.600"
            marginBottom={1}
          >
            <span role="img" aria-label="hello-emoji">
              👋
            </span>{' '}
            Приветствуем вас, {user.name}
          </Text>
          <Heading as="h1">Последние новости</Heading>
        </Box>
        <Articles articles={[1, 2, 3, 4]} />
      </Box>
    </>
  );
};

export default MainPage;
