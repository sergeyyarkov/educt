import { ApolloError } from 'apollo-server-express'
import { Resolver, Mutation, Arg, Authorized, Ctx } from 'type-graphql'
import { IContext } from '../../../../../interfaces'
import { User } from '../../../../entities/User'
import { UpdateUserInput } from './Inputs/UpdateUserInput'

/**
 * 
 * Update user mutation resolver 
 * Updates user data and returns updated user
 * Authorized: USER
 * 
 */

@Resolver()
export class UpdateUserResolver {
  @Authorized()
  @Mutation(() => User, { description: 'Updates user data and returns updated user' })
  async updateProfile(@Arg('input') { contacts }: UpdateUserInput, @Ctx() ctx: IContext) {
    try {
      const user = await User.findOne(ctx.req.userId)

      if (!user) {
        throw new ApolloError(
          'Такого пользователя не существует!',
          '404 Not Found'
        );
      }

      user.contacts = contacts
      user.save()
      
      return user
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}