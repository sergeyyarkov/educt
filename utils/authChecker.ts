import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { AuthChecker } from 'type-graphql'
import { IContext } from '../interfaces';

export const authChecker: AuthChecker<IContext> = ({ root, args, context, info }, roles) => {
  if (!context.req.userId) throw new AuthenticationError('Unauthenticated')

  /* Permissions */
  if (roles.length === 0) return true
  if (!context.req.userRoles?.some(role => roles.includes(role))) throw new ApolloError('Недостаточно прав на выполнение этой операции!', '403 Forbidden')

  return true;
};