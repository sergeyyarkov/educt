/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  __typename: 'AuthData';
  _id: string;
  token: string;
  tokenExpiration: number;
  name: string;
  surname: string;
  patronymic: string;
}

export interface Login {
  login: Login_login | null;
}

export interface LoginVariables {
  login: string;
  password: string;
}
