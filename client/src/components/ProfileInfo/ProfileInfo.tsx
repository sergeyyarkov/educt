import React from 'react';
import { Flex, Box, Heading, Text, Avatar, Skeleton } from '@chakra-ui/core';
import UserBadge from '../UserBadge/UserBadge';
import { currentUserData } from '../../graphql/queries/__generated__/currentUserData';
import ProfileContacts from '../ProfileContacts/ProfileContacts';

const ProfileInfo: React.FC<{
  loading: boolean;
  data: currentUserData | undefined;
}> = ({ data, loading }) => {
  if (data?.me === null) {
    return null;
  }

  return (
    <Flex mb={8}>
      <Box>
        <Avatar
          border="4px solid #E2E8F0"
          size="2xl"
          name={data?.me.name || ''}
          src="https://bit.ly/broken-link"
        />
      </Box>
      <Box ml="60px">
        <Flex flexDirection="column">
          {loading ? (
            <>
              <Skeleton width="500px" height="40px" mb="5px" />
              <Skeleton width="400px" height="24px" mb="10px" />
              <Skeleton width="200px" height="24px" mb="5px" />
            </>
          ) : (
            <>
              <Heading as="h2" mb={1} fontWeight="600">
                {data?.me.name}&nbsp;{data?.me.surname}
              </Heading>
              <Flex alignItems="center" mb="15px">
                <Text color="blue.500">{data?.me.email}&nbsp;-&nbsp;</Text>
                <UserBadge roles={data?.me.roles} />
              </Flex>
              <ProfileContacts contacts={data?.me.contacts} />
            </>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProfileInfo;
