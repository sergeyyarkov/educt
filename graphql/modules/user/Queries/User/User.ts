import { ApolloError } from 'apollo-server-express';
import { Resolver, Query, Arg } from 'type-graphql'
import { User } from '../../../../entities/User'
import { FindUserInput } from './Inputs/FindUserInput';

/**
 * 
 * User query resolver
 * Returns a current user by slug or id
 * 
 */

@Resolver(User)
export class UserResolver {
  @Query(() => User, { description: 'Returns a current user by slug or id' })
  async user(@Arg('input') input: FindUserInput) {
    try {
      if (!input.id && !input.slug || Object.keys(input).length > 1) {
        throw new ApolloError('Поиск осуществляется только по параметрам "slug" или "id"', '400 Bad Request');
      }

      const user = await User.findOne({ where: [
        { id: input.id },
        { login: input.slug }
      ]})

      if (!user) {
        throw new ApolloError('Такого пользователя не существует.', '404 Not Found');
      }

      return user
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}