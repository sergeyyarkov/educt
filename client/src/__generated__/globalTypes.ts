/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Names of contacts
 */
export enum ContactsList {
  TELEGRAM = 'TELEGRAM',
  VK = 'VK',
}

/**
 * Roles of users
 */
export enum Roles {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  USER = 'USER',
}

export interface ChangeUserPasswdInput {
  oldPasswd: string;
  newPasswd: string;
}

/**
 * Contacts of user such as vk, telegram, etc..
 */
export interface ContactsUserInput {
  name: ContactsList;
  link: string;
}

/**
 * Update profile
 */
export interface UpdateUserInput {
  contacts: ContactsUserInput[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
