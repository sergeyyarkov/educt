/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ContactInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateContacts
// ====================================================

export interface UpdateContacts_user_contacts {
  __typename: "Contact";
  name: string | null;
  link: string | null;
}

export interface UpdateContacts_user {
  __typename: "User";
  contacts: (UpdateContacts_user_contacts | null)[] | null;
}

export interface UpdateContacts {
  user: UpdateContacts_user | null;
}

export interface UpdateContactsVariables {
  contacts?: ContactInput[] | null;
}
