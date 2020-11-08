import { Resolver, Query, FieldResolver, Root } from 'type-graphql'
import { User } from '../../../../entities/User'

/**
 * 
 * Users resolver
 * returns a list of users
 * 
 */

@Resolver(User)
export class UsersResolver {
  @Query(() => [User])
  async users() {
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