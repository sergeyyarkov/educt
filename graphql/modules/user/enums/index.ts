import { registerEnumType } from 'type-graphql'

/* 
  Enums declare
*/

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  OWNER = 'OWNER'
}

export enum ContactsList {
  VK = "vk",
  TELEGRAM = "telegram"
}

/* 
  Enums register
*/

registerEnumType(Roles, {
  name: "Roles",
  description: "Roles of users",
})

registerEnumType(ContactsList, {
  name: "ContactsList",
  description: "Names of contacts"
})