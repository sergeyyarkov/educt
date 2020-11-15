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
  Badge,
  Image,
  Grid,
  Button,
  Divider,
  Link
} from '@chakra-ui/react';
import { IPageProps } from '../interfaces';
import { useCurrentUserDataQuery } from '../__generated__/types';
import { MdSupervisorAccount, MdComment } from "react-icons/md";
import { FcLike } from 'react-icons/fc'
import { ReactComponent as HotIcon } from '../images/hot-icon.svg'

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
          <Heading as='h1' mt='15px'>Главная</Heading>
          <Grid templateColumns="3fr 1fr" mt='25px'>
            <Box>
              <Grid templateColumns="repeat(2, 1fr)" gap='5px' >
                {[1,2,3,4,5,6].map((n, i) => {
                    return (
                      <Box key={i} mb='40px' mr='15px' maxW='100%'>
                        <Box h='210px'>
                          <Image h='100%' w='100%' objectFit='cover' borderTopRightRadius='lg' borderTopLeftRadius='lg' src="https://ares.decipherzone.com/blog-manager/uploads/banner_webp_da06d145-93f9-4df9-8c7e-1e2c332c3a4a.webp" />
                        </Box>
                        <Box pt='15px' pl='10px' pr='10px' pb='10px' borderBottomRightRadius='lg' borderBottomLeftRadius='lg' borderWidth='1px'>
                          <Flex align="baseline">
                            <Badge color="blue.600">Разработка</Badge>
                          </Flex>
                          <Text mt='10px' fontSize="xl" fontWeight="semibold" lineHeight="short">
                            <Link>Fullstack курс веб-разработки на ReactJS/NodeJS</Link>
                          </Text>
                          <Flex mt='30px' align="center">
                            <Flex alignItems='center'>
                              <Box as={MdSupervisorAccount} />
                              <Text fontSize="sm" ml='5px'>
                                1278 учеников
                              </Text>
                            </Flex>
                            <Flex alignItems='center' ml='10px'>
                              <Box as={MdComment} />
                              <Text fontSize="sm" ml='5px'>
                                48 комментариев
                              </Text>
                            </Flex>
                            <Flex alignItems='center' ml='10px'>
                              <Box as={FcLike} />
                              <Text fontSize="sm" ml='5px'>
                                245 понравилось
                              </Text>
                            </Flex>
                          </Flex>
                        </Box>
                      </Box>
                    )
                  })}
              </Grid>
              <Flex justifyContent='center'>
                <Button colorScheme='blue' variant='outline'>Смотерть все курсы</Button>
              </Flex>
            </Box>
            <Box maxH='370px' p='10px' pl='20px' pr='20px' bg='gray.50' borderWidth='1px' borderRadius='lg'>
              <Flex alignItems='center'>
                <HotIcon />
                <Heading as='h3' fontSize='xl' mb='5px' ml='10px'>Популярные курсы</Heading>
              </Flex>
              <Divider />
              <Box mt='10px' lineHeight='19.2px'>
                {[1,2,3,4,5].map((n,i) => (<Box key={i} mb='10px'><Link fontSize='15px' href='#'>Fullstack курс веб-разработки на ReactJS/NodeJS</Link></Box>))}
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
