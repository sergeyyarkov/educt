/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  __typename: 'AuthData';
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  token: string;
}

export interface Login {
  /**
   * Login user
   */
  login: Login_login;
}

export interface LoginVariables {
  login: string;
  password: string;
}
