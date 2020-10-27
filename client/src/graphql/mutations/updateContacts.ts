import gql from 'graphql-tag';

const UPDATE_CONTACTS = gql`
  mutation UpdateContacts($contacts: [ContactInput!]) {
  user: updateContacts(contacts: $contacts) {
    contacts {
      name
      link
    }
  }
}
`;

export default UPDATE_CONTACTS;
