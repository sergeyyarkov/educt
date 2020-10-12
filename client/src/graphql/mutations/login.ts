import gql from 'graphql-tag';

const LOGIN_QUERY = gql`
  mutation Login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      _id
      token
      tokenExpiration
      name
      surname
      patronymic
    }
  }
`;

export default LOGIN_QUERY;
