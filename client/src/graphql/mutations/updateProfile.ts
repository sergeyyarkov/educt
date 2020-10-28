import gql from 'graphql-tag';

const UPDATE_PROFILE = gql`
  mutation updateProfile($contacts: [ContactInput!]) {
    user: updateProfile(contacts: $contacts) {
      contacts {
        name
        link
      }
    }
  }
`;

export default UPDATE_PROFILE;
