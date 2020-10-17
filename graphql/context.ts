import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../graphql/models/index';
import { IContext, IUser } from '../interfaces';

async function getCurrentUser(token: string): Promise<any> {
  const decodeToken: any = jwt.verify(token, process.env.SECRET_KEY as string);
  const currentUser = await User.findById(decodeToken._id);

  return currentUser;
}

export default async ({ req, res }: { req: Request, res: Response }): Promise<IContext> => {
  const token: string = req.cookies['token'] || ''

  if (token) {
    let currentUser: IUser | null;

    try {
      currentUser = await getCurrentUser(token);
    } catch (err) {
      return { isAuth: false, res, req };
    }

    if (currentUser) {
      return { isAuth: true, currentUser, res, req };
    } else {
      return { isAuth: false, res, req };
    }
  } else {
    return { isAuth: false, res, req };
  }
};
