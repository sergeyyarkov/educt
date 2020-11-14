import React from 'react';
import Articles from '../components/Articles/Articles';
import {
  Box,
  Heading,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Skeleton,
} from '@chakra-ui/core';
import { IPageProps } from '../interfaces';
import { useCurrentUserDataQuery } from '../__generated__/types';

const MainPage: React.FC<IPageProps> = ({ title }) => {
  const currentUser = useCurrentUserDataQuery()

  if (currentUser.error) {
    console.error(currentUser.error);
    return (
      <>
        <Heading>Произошла ошибка:</Heading>
        <Text>{currentUser.error.message}</Text>
      </>
    );
  }

  return (
    <>
      <Breadcrumb fontWeight="medium" fontSize="sm">
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/">{title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box marginTop={10}>
        <Box>
          {currentUser.loading ? (
            <Skeleton width="300px" height="24px" />
          ) : (
            <Text
              fontWeight={600}
              fontSize="md"
              color="blue.600"
              marginBottom={1}
            >
              <span role="img" aria-label="hello-emoji">
                👋
              </span>{' '}
              Приветствуем вас, {currentUser.data?.me.name}
            </Text>
          )}
          <Heading as="h1">Последние новости</Heading>
        </Box>
        <Articles articles={[1, 2, 3, 4]} />
      </Box>
    </>
  );
};

export default MainPage;
