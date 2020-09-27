import gql from 'graphql-tag'

const LOGIN_QUERY = gql`
  mutation Login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      userId
      token
      tokenExpiration
      roles
    }
  }
`

export default LOGIN_QUERY