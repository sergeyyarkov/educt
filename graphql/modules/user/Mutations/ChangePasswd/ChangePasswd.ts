import * as bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-express';
import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { IContext } from '../../../../../interfaces';
import { User } from '../../../../entities/User';
import { ChangeUserPasswdInput } from './Inputs/ChangeUserPasswdInput';

/**
 *
 * Change user password mutation resolver
 * Сhanges the user's password and returns a new password
 * Authorized: USER
 *
 */

@Resolver()
export class ChangeUserPasswdResolver {
  @Authorized()
  @Mutation(() => String, {
    description: "Сhanges the user's password and returns a new password",
  })
  async changePassword(
    @Arg('input') { oldPasswd, newPasswd }: ChangeUserPasswdInput,
    @Ctx() ctx: IContext
  ): Promise<string> {
    try {
      const user = await User.findOne(ctx.req.userId);
      const hashedNewPassword = bcrypt.hashSync(newPasswd, 10);

      if (!user) {
        throw new ApolloError(
          'Такого пользователя не существует!',
          '404 Not Found'
        );
      }

      if (oldPasswd.toLocaleLowerCase() === newPasswd.toLocaleLowerCase()) {
        throw new ApolloError(
          'Новый пароль совпадает со старым!',
          '400 Bad Request'
        );
      }

      const validate = await bcrypt.compare(oldPasswd, user.password);

      if (!validate) {
        throw new ApolloError('Неверный пароль!', '403 Forbidden');
      }

      user.password = hashedNewPassword;
      user.save();

      return newPasswd;
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}
