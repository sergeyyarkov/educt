import { buildSchemaSync } from 'type-graphql'

/* 
  User resolvers 
*/

import { UsersResolver } from './user/Queries/Users/Users'
import { RegisterResolver } from './user/Mutations/Register/Register'

const schema = buildSchemaSync({
  resolvers: [RegisterResolver, UsersResolver],
  validate: false,
})

export { schema }