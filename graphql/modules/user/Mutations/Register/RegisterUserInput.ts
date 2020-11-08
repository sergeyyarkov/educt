import { InputType, Field } from 'type-graphql'
import { Roles } from '../../enums'
import { ContactsUserInput } from './ContactsUserInput'

/* 
  Input type for register User
*/

@InputType({ description: "Register a new user" })
export class RegisterUserInput {
  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  patronymic: string;
  
  @Field()
  login: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => [Roles])
  roles: Roles[];

  @Field(() => [ContactsUserInput])
  contacts: ContactsUserInput[]
}
