import * as bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-express';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { AuthData } from './ObjectTypes/AuthData';
import { IContext } from '../../../../../interfaces';
import { User } from '../../../../entities/User';
import { createTokens } from '../../../../../utils/createTokens';

/**
 *
 * Login user mutation resolver
 * Set cookies and returns AuthData
 *
 */

@Resolver()
export class LoginUserResolver {
  @Mutation(() => AuthData, { description: 'Login user' })
  async login(
    @Arg('login') login: string,
    @Arg('password') password: string,
    @Ctx() ctx: IContext
  ): Promise<AuthData> {
    try {
      if (!ctx.req.userId) {
        const user = await User.findOne(
          login.includes('@')
            ? { where: { email: login } }
            : { where: { login: login } }
        );

        if (!user) {
          throw new ApolloError(
            'Такого пользователя не существует!',
            '404 Not Found'
          );
        }

        const validate = await bcrypt.compare(password, user.password);

        if (!validate) {
          throw new ApolloError('Неверный пароль!', '403 Forbidden');
        }

        const tokens = createTokens(user);

        ctx.res.cookie('access-token', tokens.accessToken, {
          httpOnly: true,
          //secure: true, // https
          //domain: 'example.com', // domain
        });

        ctx.res.cookie('refresh-token', tokens.refreshToken, {
          httpOnly: true,
          //secure: true, // https
          //domain: 'example.com', // domain
        });

        return {
          id: user.id,
          name: user.name,
          surname: user.surname,
          patronymic: user.patronymic,
          token: tokens.accessToken,
        };
      } else {
        /* User already logged in */
        throw new ApolloError('Вы уже авторизованы!', '406 Not Acceptable');
      }
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}
