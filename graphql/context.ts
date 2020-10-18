import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IContext } from '../interfaces';

const context = async ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<IContext> => {
  const token: string = req.cookies['access-token'] || '';

  if (!token) {
    return { isAuth: false, res, req };
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    return { isAuth: true, res, req };
  } catch {}

  return { isAuth: false, res, req };
};

export { context };
