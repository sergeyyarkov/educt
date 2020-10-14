import React from 'react';
import { MdError } from 'react-icons/md'
import { Flex, Box, Text } from '@chakra-ui/core'
import { useQuery } from '@apollo/client';
import { IUserData } from '../interfaces';

import GET_CURRENT_USER from '../graphql/queries/getCurrentUserData'

const UserContext = React.createContext({});

export const UserProvider: React.FC = ({ children }) => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  
  if (error) {
    console.error(error)
    return (
      <Box textAlign='center' marginTop='6rem'>
        <Flex justifyContent='center' alignItems='center'>
          <Box as={MdError} size='48px' color="red.500" marginRight='15px' />
        </Flex>
        <Text fontWeight='bold' fontSize='3xl'>Произошла ошибка =(</Text>
        <Text>Попробуйте обновить страницу.</Text>
      </Box>
    )
  }

  const user: IUserData = loading || !data.getCurrentUserData ? { loading: true } : data.getCurrentUserData;
  
  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  );
};

export default UserContext;