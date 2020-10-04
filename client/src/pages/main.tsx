import React from 'react';
import { Box, Heading, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, } from '@chakra-ui/core'
import { PageProps } from '../interfaces';

const MainPage: React.FC<PageProps> = ({ title }) => {
  return (
    <>
      <Breadcrumb fontWeight="medium" fontSize="sm">
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/">{title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box marginTop={10}>
        <Text fontWeight={600} fontSize='md' color='blue.600' marginBottom={1}><span role='img' aria-label='hello-emoji'>👋</span> Приветствуем вас, user!</Text>
        <Heading as='h1'>Последние новости</Heading> 
      </Box>
    </>
  )
}

export default MainPage

