import { Request, Response } from 'express';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import { Document, DocumentQuery } from 'mongoose';

export interface IRequestData extends Request {
  userId?: string;
  userRoles?: string[];
}

export interface IContext extends ApolloServerExpressConfig {
  res: Response;
  req: IRequestData;
}

export interface IAuthData {
  _id: string;
  token: string;
  tokenExpiration: number;
  name: string;
  surname: string;
  patronymic: string;
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
  contacts:
    | {
        name: string;
        link: string;
      }[]
    | null;
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
