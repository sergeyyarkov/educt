import { AuthenticationError } from 'apollo-server-express';

export const assertAuth = (context: any) => {
  if (!context.isAuth) {
    throw new AuthenticationError('Unauthenticated!');
  }
};
