import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../graphql/models/index'
import { IContext, IUser } from '../interfaces';

async function getCurrentUser(token: string): Promise<any> {
  const decodeToken: any = jwt.verify(token, process.env.SECRET_KEY as string); // getting _id of user in jwt signed token
  const currentUser: IUser | null = await User.findById(decodeToken._id)

  return currentUser
}

export default async ({ req }: { req: Request }): Promise<IContext> => {
  const header = req.headers.authorization;

  if (!header) return { isAuth: false };

  const token: string = header.split(' ')[1];

  if (token) {
    let currentUser: any;

    try {
      currentUser = await getCurrentUser(token)
    } catch (err) {
      return { isAuth: false };
    }
  
    if (currentUser) {
      return { isAuth: true, roles: currentUser.roles, currentUser };
    } else {
      return { isAuth: false }
    }
  } else {
    return { isAuth: false };
  }
};
