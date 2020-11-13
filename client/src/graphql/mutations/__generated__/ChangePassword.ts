/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChangeUserPasswdInput } from './../../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: ChangePassword
// ====================================================

export interface ChangePassword {
  /**
   * Сhanges the user's password and returns a new password
   */
  changedPassword: string;
}

export interface ChangePasswordVariables {
  input: ChangeUserPasswdInput;
}
