import gql from 'graphql-tag';

const LOGIN_QUERY = gql`
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

export default LOGIN_QUERY;
