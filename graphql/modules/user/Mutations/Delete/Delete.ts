import { Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../../../../entities/User'
import { ApolloError } from 'apollo-server-express'
import { DeleteUserInput } from './Inputs/DeleteUserInput'

/**
 * 
 * Delete user mutation resolver
 * Removes the user and returns it
 * 
 */

@Resolver(User)
export class DeleteUserResolver {
  @Mutation(() => User, { description: 'Removes the user and returns it' })
  async deleteUser(@Arg('input') input: DeleteUserInput) {
    try {
      const user = await User.findOne(input.id)

      if (!user) {
        throw new ApolloError('Такого пользователя не существует.', '404 Not Found');
      }

      user.remove()
      
      return user
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}