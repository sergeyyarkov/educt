/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput } from './../../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: updateProfile
// ====================================================

export interface updateProfile_user_contacts {
  __typename: 'Contact';
  name: string;
  link: string;
}

export interface updateProfile_user {
  __typename: 'User';
  contacts: updateProfile_user_contacts[];
}

export interface updateProfile {
  /**
   * Updates user data and returns updated user
   */
  user: updateProfile_user;
}

export interface updateProfileVariables {
  input: UpdateUserInput;
}
