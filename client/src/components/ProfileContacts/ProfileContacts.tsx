import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Contact } from '../../__generated__/types';
import VkContact from './VkContact';
import TelegramContact from './TelegramContact';

/**
 *
 * ProfileContacts component
 * Returns the user's contact list.
 *
 */

interface IProfileContactsProps {
  contacts: (Contact | null)[] | null | undefined;
}

const ProfileContacts: React.FC<IProfileContactsProps> = ({ contacts }) => {
  const vk = contacts?.find((contact) => contact?.name === 'vk');
  const telegram = contacts?.find((contact) => contact?.name === 'telegram');

  return (
    <Flex>
      <VkContact vk={vk} />
      <TelegramContact telegram={telegram} />
    </Flex>
  );
};

export default ProfileContacts;
