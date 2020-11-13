import jwt from 'jsonwebtoken';
import { User } from '../graphql/entities/User'

export const createTokens = (user: User) => {
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '7d',
    }
  );
  const accessToken = jwt.sign(
    { id: user.id, roles: user.roles },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '1h' }
  );

  return { refreshToken, accessToken };
};
