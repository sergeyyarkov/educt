import { AuthenticationError, ApolloError } from 'apollo-server-express';
import { IContext } from '../../interfaces';

enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const assertAuth = (context: IContext): void => {
  if (!context.isAuth) {
    throw new AuthenticationError('Unauthenticated!');
  }
};

export const assertAdmin = (context: IContext): void => {
  if (context.roles !== undefined && !context.roles.includes(Roles.ADMIN)) {
    throw new ApolloError(
      'You dont have permission for this!',
      '403 Forbidden'
    );
  }
};
