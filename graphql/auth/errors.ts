import { AuthenticationError, ApolloError } from 'apollo-server-express';

const Errors = {
  aunthentication: new AuthenticationError('Unauthenticated'),
  permission: new ApolloError('You dont have permission for this!', '403 Forbidden')
}

export default Errors