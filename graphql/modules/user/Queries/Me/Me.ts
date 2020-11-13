import { ApolloError } from 'apollo-server-express'
import { Resolver, Query, Ctx, Authorized } from 'type-graphql'
import { IContext } from '../../../../../interfaces'
import { User } from '../../../../entities/User'

/**
 * 
 * Me query resolver
 * Returns the authorized user
 * Authorized: USER
 * 
 */

@Resolver()
export class MeResolver {
  @Authorized()
  @Query(() => User, { description: 'Returns the authorized user' })
  async me(@Ctx() ctx: IContext): Promise<User> {
    try {
      const user = await User.findOne(ctx.req.userId)
      if (!user) {
        throw new ApolloError('Такого пользователя не существует.', '404 Not Found');
      }
      return user;
    } catch (error) {
      throw error
    }
  }
}