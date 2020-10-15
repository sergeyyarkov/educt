import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';
import { User } from '../../models/index';
import { IAuthData } from '../../../interfaces';

const authResolver: IResolvers = {
  Mutation: {
    login: async (
      _,
      args: {
        login: string;
        password: string;
      }
    ): Promise<IAuthData> => {
      try {
        const user = await User.findOne({
          $or: [{ login: args.login }, { email: args.login }],
        });

        if (!user) {
          throw new ApolloError(
            'Такого пользователя не существует!',
            '404 Not Found'
          );
        }

        const validate = await bcrypt.compare(args.password, user.password);

        if (!validate) {
          throw new ApolloError('Неверный пароль!', '403 Forbidden');
        }

        const token = jwt.sign(
          { _id: user._id },
          process.env.SECRET_KEY as string,
          { expiresIn: '1h' }
        );

        return {
          _id: user._id,
          name: user.name,
          surname: user.surname,
          patronymic: user.patronymic,
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
