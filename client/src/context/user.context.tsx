import React from 'react';
import { Heading } from '@chakra-ui/core'
import { useQuery } from '@apollo/client';

import GET_CURRENT_USER from '../graphql/queries/getCurrentUserData'
import { IUserData } from '../interfaces';

const UserContext = React.createContext({});

export const UserProvider: React.FC = ({ children }) => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  if (error) {
    return <Heading as='h1' fontSize='2xl'>Error: {error.message}</Heading>
  }

  const user: IUserData = loading || !data.getCurrentUserData ? { loading: true } : data.getCurrentUserData;
  
  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  );
};

export default UserContext;