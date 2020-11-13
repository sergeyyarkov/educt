import { InputType, Field } from 'type-graphql'
import { ContactsUserInput } from '../../Register/Inputs/ContactsUserInput'
import { IsContactsValid } from '../../../validations/isContactsValid';

/* 
  Input type for update user
*/

@InputType({ description: "Update profile" })
export class UpdateUserInput {
  @Field(() => [ContactsUserInput])
  @IsContactsValid({ message: 'Ошибка валидации контактов!' })
  contacts: ContactsUserInput[]
}
