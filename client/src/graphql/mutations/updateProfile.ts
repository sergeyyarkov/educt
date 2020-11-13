import gql from 'graphql-tag';

const UPDATE_PROFILE = gql`
  mutation updateProfile($input: UpdateUserInput!) {
    user: updateProfile(input: $input) {
      contacts {
        name
        link
      }
    }
  }
`;

export default UPDATE_PROFILE;
