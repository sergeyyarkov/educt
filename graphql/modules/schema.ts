import { buildSchemaSync } from 'type-graphql'
import { authChecker } from './authChecker'

/* 
  User resolvers 
*/

import { UsersResolver } from './user/Queries/Users/Users'
import { UserResolver } from './user/Queries/User/User'
import { MeResolver } from './user/Queries/Me/Me'
import { LoginUserResolver } from './user/Mutations/Login/Login'
import { LogoutUserResolver } from './user/Mutations/Logout/Logout'
import { RegisterUserResolver } from './user/Mutations/Register/Register'
import { DeleteUserResolver } from './user/Mutations/Delete/Delete'

const schema = buildSchemaSync({
  resolvers: [UsersResolver, UserResolver, MeResolver, LoginUserResolver, LogoutUserResolver, RegisterUserResolver, DeleteUserResolver],
  validate: false,
  authChecker
})

export { schema }