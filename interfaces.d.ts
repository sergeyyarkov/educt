import { ApolloServerExpressConfig } from 'apollo-server-express';
import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  roles: string[];
}

export interface IContext extends ApolloServerExpressConfig {
  isAuth: boolean;
  userId?: string;
}
