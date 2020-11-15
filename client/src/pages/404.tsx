import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Box, Heading, Button } from '@chakra-ui/react';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Ошибка 404</title>
      </Helmet>
      <Box textAlign="center" mt={40}>
        <Heading display="block" as="h1" fontSize="4xl">
          <span role="img" aria-label="error">
            😭
          </span>{' '}
          Ошибка 404{' '}
          <span role="img" aria-label="error">
            😭
          </span>
        </Heading>
        <Link to="/">
          <Button variant="link" colorScheme="blue">
            Вернуться на главную
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default NotFoundPage;
