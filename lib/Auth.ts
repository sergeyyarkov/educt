import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { IContext } from '../interfaces';

export default ({ req }: { req: Request }): IContext => {
  const header = req.headers.authorization;

  if (!header) return { isAuth: false };

  const token: string = header.split(' ')[1];

  if (!token) return { isAuth: false };

  let decodeToken: any;

  try {
    decodeToken = jwt.verify(token, process.env.SECRET_KEY as string);
  } catch (err) {
    return { isAuth: false };
  }

  if (!decodeToken) return { isAuth: false };

  return { isAuth: true, userId: decodeToken.userId, roles: decodeToken.roles };
};
