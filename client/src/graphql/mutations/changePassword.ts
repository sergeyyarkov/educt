import gql from 'graphql-tag';

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changedPassword: changePassword(input: $input)
  }
`;

export default CHANGE_PASSWORD;
