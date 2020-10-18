import bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';
import { User } from '../../models/index';
import { IAuthData, IContext } from '../../../interfaces';
import { createTokens } from '../../auth/createTokens'

const authResolver: IResolvers = {
  Mutation: {
    login: async (
      _,
      args: {
        login: string;
        password: string;
      },
      context: IContext
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

        const tokens = createTokens(user)

        context.res.cookie('access-token', tokens.accessToken, {
          httpOnly: true,
          //secure: true, // https
          //domain: 'example.com', // domain
        })

        context.res.cookie('refresh-token', tokens.refreshToken, {
          httpOnly: true,
          //secure: true, // https
          //domain: 'example.com', // domain
        })

        return {
          _id: user._id,
          name: user.name,
          surname: user.surname,
          patronymic: user.patronymic,
          token: tokens.accessToken,
          tokenExpiration: 1,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};

export default authResolver;
