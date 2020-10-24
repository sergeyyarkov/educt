/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: currentUserData
// ====================================================

export interface currentUserData_me {
  __typename: "User";
  _id: string | null;
  roles: (string | null)[] | null;
  name: string | null;
  surname: string | null;
  patronymic: string | null;
  login: string | null;
  email: string | null;
}

export interface currentUserData {
  me: currentUserData_me | null;
}
