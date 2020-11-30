import { Request, Response } from 'express';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import { courseLoader } from './graphql/loaders/courseLoader';

export interface IRequestData extends Request {
  userId?: number;
  userRoles?: string[];
}

export interface IContext extends ApolloServerExpressConfig {
  res: Response;
  req: IRequestData;
  courseLoader: ReturnType<typeof courseLoader>
}
