import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import { FaVk } from 'react-icons/fa';
import { Contact } from '../../__generated__/types';

/**
 *
 * VkContact component
 *
 */

const VkContact: React.FC<{ vk: Contact | null | undefined }> = ({ vk }) => {
  if (!vk) {
    return null;
  }

  return (
    <Link
      href={`${vk.link}`}
      target="_blank"
      rel="noopener noreferrer"
      mr="5px"
    >
      <Box as={FaVk} boxSize="18px"></Box>
    </Link>
  );
};

export default VkContact;
