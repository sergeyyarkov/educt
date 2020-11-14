import React from 'react';
import { FaVk, FaTelegramPlane } from 'react-icons/fa';
import { Flex, Box, Link } from '@chakra-ui/core';
import { Contact } from '../../__generated__/types';

const ProfileContacts: React.FC<{
  contacts: (Contact | null)[] | null | undefined;
}> = ({ contacts }) => {
  const vk = contacts?.find((contact) => contact?.name === 'vk');
  const telegram = contacts?.find((contact) => contact?.name === 'telegram');

  return (
    <Flex>
      {vk ? (
        <Link
          href={`${vk?.link}`}
          target="_blank"
          rel="noopener noreferrer"
          mr="5px"
        >
          <Box as={FaVk} size="18px"></Box>
        </Link>
      ) : null}
      {telegram ? (
        <Link
          href={`https://t.me/${telegram.link?.slice(1)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Box as={FaTelegramPlane} size="18px"></Box>
        </Link>
      ) : null}
    </Flex>
  );
};

export default ProfileContacts;
