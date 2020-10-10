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
import { IPageProps } from '../interfaces';

const MainPage: React.FC<IPageProps> = ({ title }) => {
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
            Приветствуем вас, user
          </Text>
          <Heading as="h1">Последние новости</Heading>
        </Box>
        <Articles articles={[1, 2, 3, 4]} />
      </Box>
    </>
  );
};

export default MainPage;
