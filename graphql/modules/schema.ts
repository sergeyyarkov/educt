import { buildSchemaSync } from 'type-graphql'

/* 
  User resolvers 
*/

import { UsersResolver } from './user/Queries/Users/Users'
import { UserResolver } from './user/Queries/User/User'
import { RegisterResolver } from './user/Mutations/Register/Register'

const schema = buildSchemaSync({
  resolvers: [RegisterResolver, UsersResolver, UserResolver],
  validate: false,
})

export { schema }