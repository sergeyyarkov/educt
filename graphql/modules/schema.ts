import { buildSchemaSync } from 'type-graphql'

/* 
  User resolvers 
*/

import { UsersResolver } from './user/Queries/Users/Users'
import { UserResolver } from './user/Queries/User/User'
import { RegisterUserResolver } from './user/Mutations/Register/Register'
import { DeleteUserResolver } from './user/Mutations/Delete/Delete'

const schema = buildSchemaSync({
  resolvers: [UsersResolver, UserResolver, RegisterUserResolver, DeleteUserResolver],
  validate: false,
})

export { schema }