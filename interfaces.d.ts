import { ApolloServerExpressConfig } from 'apollo-server-express';
import { Document, DocumentQuery } from 'mongoose';

export interface IContext extends ApolloServerExpressConfig {
  isAuth: boolean;
  userId?: string;
  roles?: string[];
}

export interface IToken {
  userId: string;
  roles: string[];
  token: string;
  tokenExpiration: number;
}

export interface IUser extends Document {
  slug: string;
  name: string;
  surname: string;
  patronymic: string;
  login: string;
  email: string;
  password: string;
  roles: string[];
}

export interface ILesson extends Document {
  title: string;
  description: string;
  date: Date;
  content: string;
  courseId: string;
  publishedAt: Date;
  updatedAt: Date;
}

export interface ICourse extends Document {
  title: string;
  description: string;
  lessons: ILesson[];
  studentIds: string[];
  teacherId: string;
  publishedAt: Date;
  updatedAt: Date;
}
