import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, Badge, Heading, Text, Button } from '@chakra-ui/core';
import { IArticlesProps } from '../../interfaces';

const Articles: React.FC<IArticlesProps> = ({ articles }) => {
  return (
    <Flex marginTop={10} flexDirection="column">
      {articles.map((n, i) => (
        <Box key={i} marginBottom={10}>
          <Badge variantColor="blue">Информация</Badge>
          <Heading fontSize="3xl">Заголовок {i + 1}</Heading>
          <Text as="small">2020-10-10 • от User</Text>
          <Text marginTop={1}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            iste voluptatibus recusandae commodi impedit perferendis esse
            asperiores eos veniam nihil sapiente nobis aperiam, architecto
            exercitationem in odio possimus. Eos ipsa totam et debitis quis fuga
            eius eveniet mollitia voluptatem praesentium?
          </Text>
          <Link to="/">
            <Button variant="link">Читать далее</Button>
          </Link>
        </Box>
      ))}
    </Flex>
  );
};

export default Articles;
