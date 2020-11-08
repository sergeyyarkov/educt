import { InputType, Field } from 'type-graphql'
import { ContactsList } from '../../../enums'

/* 
  Input type for contacts field
*/

@InputType({ description: "Contacts of user such as vk, telegram, etc.." })
export class ContactsUserInput {
  @Field(() => ContactsList)
  name: ContactsList;

  @Field()
  link: string;
}