import gql from 'graphql-tag';

const LOGOUT_QUERY = gql`
  mutation Logout {
    logout
  }
`;

export default LOGOUT_QUERY;
