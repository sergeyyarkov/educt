import { Request } from 'express';
import jwt from 'jsonwebtoken';

export default ({ req }: { req: Request }) => {
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

  return { isAuth: true, userId: decodeToken.userId };
};
