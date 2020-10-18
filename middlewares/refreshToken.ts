import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../graphql/models/index';
import { createTokens } from '../graphql/auth/createTokens';
import { IRequestData } from '../interfaces';

export async function refreshToken(
  req: IRequestData,
  res: Response,
  next: NextFunction
) {
  const refreshToken = req.cookies['refresh-token'];
  const accessToken = req.cookies['access-token'];
  if (!refreshToken && !accessToken) {
    return next();
  }

  try {
    const data = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as any;
    req.userId = data._id;
    req.userRoles = data.roles;
    return next();
  } catch {}

  if (!refreshToken) {
    return next();
  }

  let data;

  try {
    data = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as any;
  } catch {
    return next();
  }

  const user = await User.findById(data._id);

  if (!user) {
    return next();
  }

  const tokens = createTokens(user);

  res.cookie('refresh-token', tokens.refreshToken, {
    httpOnly: true,
    //secure: true, // https
    //domain: 'example.com', // domain
  });
  res.cookie('access-token', tokens.accessToken, {
    httpOnly: true,
    //secure: true, // https
    //domain: 'example.com', // domain
  });
  req.userId = user._id;

  next();
}
