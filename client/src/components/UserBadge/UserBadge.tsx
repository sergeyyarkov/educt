import React from 'react';
import { Badge } from '@chakra-ui/react';

/**
 *
 * UserBadge component
 * Returns the user's badge by role
 *
 */

const UserBadge: React.FC<{ roles: (string | null)[] | null | undefined }> = ({
  roles,
}) => {
  if (roles === null) {
    return null;
  }

  if (roles?.includes('ADMIN')) {
    return (
      <Badge colorScheme="purple" variant="solid">
        Преподаватель
      </Badge>
    );
  } else {
    return (
      <Badge colorScheme="blue" variant="solid">
        Ученик
      </Badge>
    );
  }
};

export default UserBadge;
