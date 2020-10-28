/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ContactInput } from './../../../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: updateProfile
// ====================================================

export interface updateProfile_user_contacts {
  __typename: 'Contact';
  name: string | null;
  link: string | null;
}

export interface updateProfile_user {
  __typename: 'User';
  contacts: (updateProfile_user_contacts | null)[] | null;
}

export interface updateProfile {
  user: updateProfile_user | null;
}

export interface updateProfileVariables {
  contacts?: ContactInput[] | null;
}
