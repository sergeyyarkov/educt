import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../graphql/models/index';
import { IContext, IUser } from '../interfaces';

async function getCurrentUser(token: string): Promise<any> {
  const decodeToken: any = jwt.verify(token, process.env.SECRET_KEY as string);
  const currentUser = await User.findById(decodeToken._id);

  return currentUser;
}

export default async ({ req }: { req: Request }): Promise<IContext> => {
  const header = req.headers.authorization;

  if (!header) return { isAuth: false };

  const token: string = header.split(' ')[1];

  if (token) {
    let currentUser: IUser | null;

    try {
      currentUser = await getCurrentUser(token);
    } catch (err) {
      return { isAuth: false };
    }

    if (currentUser) {
      return { isAuth: true, currentUser };
    } else {
      return { isAuth: false };
    }
  } else {
    return { isAuth: false };
  }
};
