import { Resolver, Mutation, Arg, Authorized } from 'type-graphql';
import * as bcrypt from 'bcryptjs';
import { User } from '../../../../entities/User';
import { RegisterUserInput } from './Inputs/RegisterUserInput';
import { ApolloError } from 'apollo-server-express';

/**
 *
 * Register user mutation resolver
 * Creates a new user and returns it
 * Authorized: ADMIN
 *
 */

@Resolver()
export class RegisterUserResolver {
  @Authorized('ADMIN')
  @Mutation(() => User, { description: 'Creates a new user and returns it' })
  async registerUser(
    @Arg('input')
    {
      name,
      surname,
      patronymic,
      login,
      password,
      email,
      roles,
      contacts,
    }: RegisterUserInput
  ): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        surname,
        patronymic,
        login,
        password: hashedPassword,
        email,
        roles,
        contacts,
      }).save();

      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ApolloError(
          'Такой пользователь уже существует!',
          '409 Conflict',
          {
            detail: error.detail,
            table: error.table,
          }
        );
      }
      throw new ApolloError(error);
    }
  }
}
