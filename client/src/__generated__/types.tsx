import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  /** Returns a list of users */
  users: Array<User>;
  /** Returns a current user by slug or id */
  user: User;
  /** Returns the authorized user */
  me: User;
};

export type QueryUserArgs = {
  input: FindUserInput;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Returns full name in format Name Surname Patronymic */
  fullname: Scalars['String'];
  surname: Scalars['String'];
  patronymic: Scalars['String'];
  login: Scalars['String'];
  email: Scalars['String'];
  roles: Array<Roles>;
  contacts: Array<Contact>;
};

/** Roles of users */
export enum Roles {
  Admin = 'ADMIN',
  User = 'USER',
  Owner = 'OWNER',
}

export type Contact = {
  __typename?: 'Contact';
  link: Scalars['String'];
  name: Scalars['String'];
};

/** Find user by slug or id */
export type FindUserInput = {
  slug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Login user */
  login: AuthData;
  /** Сlears the context and returns status */
  logout: Scalars['String'];
  /** Creates a new user and returns it */
  registerUser: User;
  /** Removes the user and returns it */
  deleteUser: User;
  /** Updates user data and returns updated user */
  updateProfile: User;
  /** Сhanges the user's password and returns a new password */
  changePassword: Scalars['String'];
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  login: Scalars['String'];
};

export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};

export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};

export type MutationUpdateProfileArgs = {
  input: UpdateUserInput;
};

export type MutationChangePasswordArgs = {
  input: ChangeUserPasswdInput;
};

export type AuthData = {
  __typename?: 'AuthData';
  id: Scalars['ID'];
  name: Scalars['String'];
  surname: Scalars['String'];
  patronymic: Scalars['String'];
  token: Scalars['String'];
};

/** Register a new user */
export type RegisterUserInput = {
  name: Scalars['String'];
  surname: Scalars['String'];
  patronymic: Scalars['String'];
  login: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  roles: Array<Roles>;
  contacts: Array<ContactsUserInput>;
};

/** Contacts of user such as vk, telegram, etc.. */
export type ContactsUserInput = {
  name: ContactsList;
  link: Scalars['String'];
};

/** Names of contacts */
export enum ContactsList {
  Vk = 'VK',
  Telegram = 'TELEGRAM',
}

/** Delete user by id */
export type DeleteUserInput = {
  id: Scalars['Float'];
};

/** Update profile */
export type UpdateUserInput = {
  contacts: Array<ContactsUserInput>;
};

export type ChangeUserPasswdInput = {
  oldPasswd: Scalars['String'];
  newPasswd: Scalars['String'];
};

export type ChangePasswordMutationVariables = Exact<{
  input: ChangeUserPasswdInput;
}>;

export type ChangePasswordMutation = { __typename?: 'Mutation' } & {
  changedPassword: Mutation['changePassword'];
};

export type LoginMutationVariables = Exact<{
  login: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'AuthData' } & Pick<
    AuthData,
    'id' | 'name' | 'surname' | 'patronymic' | 'token'
  >;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'logout'
>;

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateUserInput;
}>;

export type UpdateProfileMutation = { __typename?: 'Mutation' } & {
  user: { __typename?: 'User' } & {
    contacts: Array<
      { __typename?: 'Contact' } & Pick<Contact, 'name' | 'link'>
    >;
  };
};

export type CurrentUserDataQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserDataQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<
    User,
    | 'id'
    | 'roles'
    | 'name'
    | 'fullname'
    | 'surname'
    | 'patronymic'
    | 'login'
    | 'email'
  > & {
      contacts: Array<
        { __typename?: 'Contact' } & Pick<Contact, 'name' | 'link'>
      >;
    };
};

export const ChangePasswordDocument = gql`
  mutation ChangePassword($input: ChangeUserPasswdInput!) {
    changedPassword: changePassword(input: $input)
  }
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >
) {
  return Apollo.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, baseOptions);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult = Apollo.MutationResult<
  ChangePasswordMutation
>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      id
      name
      surname
      patronymic
      token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      login: // value for 'login'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const UpdateProfileDocument = gql`
  mutation UpdateProfile($input: UpdateUserInput!) {
    user: updateProfile(input: $input) {
      contacts {
        name
        link
      }
    }
  }
`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >
) {
  return Apollo.useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UpdateProfileDocument, baseOptions);
}
export type UpdateProfileMutationHookResult = ReturnType<
  typeof useUpdateProfileMutation
>;
export type UpdateProfileMutationResult = Apollo.MutationResult<
  UpdateProfileMutation
>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;
export const CurrentUserDataDocument = gql`
  query CurrentUserData {
    me {
      id
      roles
      name
      fullname
      surname
      patronymic
      login
      email
      roles
      contacts {
        name
        link
      }
    }
  }
`;

/**
 * __useCurrentUserDataQuery__
 *
 * To run a query within a React component, call `useCurrentUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserDataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CurrentUserDataQuery,
    CurrentUserDataQueryVariables
  >
) {
  return Apollo.useQuery<CurrentUserDataQuery, CurrentUserDataQueryVariables>(
    CurrentUserDataDocument,
    baseOptions
  );
}
export function useCurrentUserDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentUserDataQuery,
    CurrentUserDataQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    CurrentUserDataQuery,
    CurrentUserDataQueryVariables
  >(CurrentUserDataDocument, baseOptions);
}
export type CurrentUserDataQueryHookResult = ReturnType<
  typeof useCurrentUserDataQuery
>;
export type CurrentUserDataLazyQueryHookResult = ReturnType<
  typeof useCurrentUserDataLazyQuery
>;
export type CurrentUserDataQueryResult = Apollo.QueryResult<
  CurrentUserDataQuery,
  CurrentUserDataQueryVariables
>;
