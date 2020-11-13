import { buildSchemaSync } from 'type-graphql'
import { authChecker } from '../../utils/authChecker'

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
import { UpdateUserResolver } from './user/Mutations/Update/Update'
import { ChangeUserPasswdResolver } from './user/Mutations/ChangePasswd/ChangePasswd'

const schema = buildSchemaSync({
  resolvers: [
    UsersResolver, 
    UserResolver, 
    MeResolver, 
    LoginUserResolver, 
    LogoutUserResolver, 
    RegisterUserResolver, 
    DeleteUserResolver,
    UpdateUserResolver, 
    ChangeUserPasswdResolver
  ],
  validate: true,
  authChecker
})

export { schema }