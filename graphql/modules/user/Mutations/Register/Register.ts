import { Resolver, Mutation, Arg } from 'type-graphql'
import * as bcrypt from 'bcryptjs'
import { User } from '../../../../entities/User'
import { RegisterUserInput } from './Inputs/RegisterUserInput'
import { ApolloError } from 'apollo-server-express'

/**
 * 
 * Register resolver 
 * creates a new user and returns it
 * 
 */

@Resolver(User)
export class RegisterResolver {
  @Mutation(() => User)
  async registerUser(@Arg('input') input: RegisterUserInput): Promise<User>  {
    try {
      const { name, surname, patronymic, login, password, email, roles, contacts } = input
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
      }).save()

      return user
    } catch (error) {
      if (error.code === "23505") {
        throw new ApolloError('Такой пользователь уже существует!', '409 Conflict', {
          detail: error.detail,
          table: error.table
        })
      }
      throw new ApolloError(error);
    }
  }
}