import React from 'react';
import { Badge } from '@chakra-ui/core';

const UserBadge: React.FC<{ roles: (string | null)[] | null | undefined }> = ({
  roles,
}) => {
  if (roles === null) {
    return null;
  }

  if (roles?.includes('ADMIN')) {
    return (
      <Badge variantColor="purple" variant="solid">
        Преподаватель
      </Badge>
    );
  } else {
    return (
      <Badge variantColor="blue" variant="solid">
        Ученик
      </Badge>
    );
  }
};

export default UserBadge;
