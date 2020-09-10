import { AuthenticationError } from 'apollo-server-express';
import { IContext } from '../../interfaces';

export const assertAuth = (context: IContext) => {
  if (!context.isAuth) {
    throw new AuthenticationError('Unauthenticated!');
  }
};
