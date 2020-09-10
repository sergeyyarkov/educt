import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';
import { User } from '../../models/index';

const authResolver: IResolvers = {
  Query: {
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new ApolloError('User doesnt exist!', '404 Not Found');
        }

        const validate = await bcrypt.compare(password, user.password);

        if (!validate) {
          throw new ApolloError('Incorrent password!', '403 Forbidden');
        }

        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.SECRET_KEY as string,
          {
            expiresIn: '1h',
          }
        );

        return { userId: user._id, token, tokenExpiration: 1 };
      } catch (error) {
        throw error;
      }
    },
  },
};

export default authResolver;
