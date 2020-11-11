import { Resolver, Query, FieldResolver, Root, Authorized } from 'type-graphql'
import { User } from '../../../../entities/User'

/**
 * 
 * Users query resolver
 * Returns a list of users
 * Authorized: USER
 * 
 */

@Resolver(User)
export class UsersResolver {
  @Authorized()
  @Query(() => [User], { description: 'Returns a list of users' })
  async users(): Promise<User[]> {
    try {
      const users = await User.find({})
      return users
    } catch (error) {
      throw error
    }
  }

  /* 
    Concat user fullname 
  */
 
  @FieldResolver()
  async fullname(@Root() parent: User) {
    return `${parent.surname} ${parent.name} ${parent.patronymic}`
  }
}