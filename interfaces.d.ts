import { ApolloServerExpressConfig } from 'apollo-server-express';
import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  surname: string;
  patronymic: string;
  login: string;
  email: string;
  password: string;
  roles: string[];
}

export interface IContext extends ApolloServerExpressConfig {
  isAuth: boolean;
  userId?: string;
  roles?: string[];
}
