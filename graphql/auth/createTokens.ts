import jwt from 'jsonwebtoken'
import { IUser } from '../../interfaces';

export const createTokens = (user: IUser) => {
  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "7d"
    }
  );
  const accessToken = jwt.sign(
    { _id: user._id, roles: user.roles },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '1h' }
  );

  return { refreshToken, accessToken };
};