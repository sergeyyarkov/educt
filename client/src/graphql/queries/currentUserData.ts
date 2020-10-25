import gql from 'graphql-tag';

const GET_CURRENT_USER_DATA = gql`
  query currentUserData {
    me {
      _id
      roles
      name
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

export default GET_CURRENT_USER_DATA;
