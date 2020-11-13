/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Roles } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: currentUserData
// ====================================================

export interface currentUserData_me_contacts {
  __typename: "Contact";
  name: string;
  link: string;
}

export interface currentUserData_me {
  __typename: "User";
  id: string;
  roles: Roles[];
  name: string;
  /**
   * Returns full name in format Name Surname Patronymic
   */
  fullname: string;
  surname: string;
  patronymic: string;
  login: string;
  email: string;
  contacts: currentUserData_me_contacts[];
}

export interface currentUserData {
  /**
   * Returns the authorized user
   */
  me: currentUserData_me;
}
