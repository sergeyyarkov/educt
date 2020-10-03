import React from 'react';
import Layout from '../components/Layout/Layout'
import { Box, Heading, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, } from '@chakra-ui/core'


const MainPage: React.FC = () => {
  return (
    <Layout>
      <Box paddingLeft='18rem' marginTop='4rem'>
        <Box as='main' marginRight='auto' marginLeft='auto' maxWidth='95rem' paddingLeft={5} paddingRight={5} paddingTop='2rem'>
          <Breadcrumb fontWeight="medium" fontSize="sm">
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/">Главная</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box marginTop={10}>
            <Text fontWeight={600} fontSize='md' color='blue.600' marginBottom={1}><span role='img' aria-label='hello-emoji'>👋</span> Приветствуем вас, user!</Text>
            <Heading as='h1'>Последние новости</Heading> 
          </Box>
        </Box> 
      </Box>
    </Layout>
  )
}

export default MainPage

