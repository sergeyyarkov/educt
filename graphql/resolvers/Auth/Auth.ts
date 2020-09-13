import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';
import { User } from '../../models/index';
import { IUser, IToken } from '../../../interfaces';

const authResolver: IResolvers = {
  Query: {
    login: async (_, { login, password }: IUser): Promise<IToken> => {
      try {
        const user = await User.findOne({ $or: [{ login }, { email: login }] });

        if (!user) {
          throw new ApolloError('User does not exist!', '404 Not Found');
        }

        const validate = await bcrypt.compare(password, user.password);

        if (!validate) {
          throw new ApolloError('Incorrent password!', '403 Forbidden');
        }

        const token = jwt.sign(
          { userId: user._id, roles: user.roles },
          process.env.SECRET_KEY as string,
          {
            expiresIn: '1h',
          }
        );

        return {
          userId: user._id,
          roles: user.roles,
          token,
          tokenExpiration: 1,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};

export default authResolver;
