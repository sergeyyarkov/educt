import React from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Skeleton,
  Grid,
  Divider,
  Link,
} from '@chakra-ui/react';
import { IPageProps } from '../interfaces';
import { useCurrentUserDataQuery } from '../__generated__/types';
import { ReactComponent as HotIcon } from '../images/hot-icon.svg';
import Courses from '../components/Courses/Courses';
import CourseCard from '../components/Courses/CourseCard';

/**
 * 
 * Main page
 * 
 */

const MainPage: React.FC<IPageProps> = ({ title }) => {
  const user = useCurrentUserDataQuery();

  if (user.error) {
    console.error(user.error);
    return (
      <>
        <Heading>Произошла ошибка:</Heading>
        <Text>{user.error.message}</Text>
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
          {user.loading ? (
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
              Приветствуем вас, {user.data?.me.name}
            </Text>
          )}
          <Heading as="h1" mt="15px">
            Главная
          </Heading>
          <Grid templateColumns="3fr 1fr" mt="25px">
            <Courses>
              {[1, 2, 3, 4, 5, 6].map((n, i) => <CourseCard key={i} />)}
            </Courses>
            <Box
              maxH="370px"
              p="10px"
              pl="20px"
              pr="20px"
              bg="gray.50"
              borderRadius="lg"
            >
              <Flex alignItems="center">
                <HotIcon />
                <Heading as="h3" fontSize="xl" mb="5px" ml="10px">
                  Популярные курсы
                </Heading>
              </Flex>
              <Divider />
              <Box mt="10px" lineHeight="19.2px">
                {[1, 2, 3, 4, 5].map((n, i) => (
                  <Box key={i} mb="10px">
                    <Link fontSize="15px" href="#">
                      Fullstack курс веб-разработки на ReactJS/NodeJS
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
