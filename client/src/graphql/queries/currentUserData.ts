import gql from 'graphql-tag';

const GET_CURRENT_USER_DATA = gql`
  query currentUserData {
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

export default GET_CURRENT_USER_DATA;
