import { Request, Response } from 'express';
import { ApolloServerExpressConfig } from 'apollo-server-express';

export interface IRequestData extends Request {
  userId?: number;
  userRoles?: string[];
}

export interface IContext extends ApolloServerExpressConfig {
  res: Response;
  req: IRequestData;
}
