import React from 'react';
import { Box, Link } from '@chakra-ui/react'
import { FaTelegramPlane } from 'react-icons/fa'
import { Contact } from '../../__generated__/types'

/**
 *
 * TelegramContact component
 *
 */

const TelegramContact: React.FC<{ telegram: Contact | null | undefined }> = ({ telegram }) => {
  if (!telegram) {
    return null
  }
  
  return (
    <Link
      href={`https://t.me/${telegram.link.slice(1)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Box as={FaTelegramPlane} boxSize="18px"></Box>
    </Link>
  )
}

export default TelegramContact