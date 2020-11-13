import { InputType, Field } from 'type-graphql';
import { Roles } from '../../../enums';
import { ContactsUserInput } from './ContactsUserInput';
import { IsEmail } from 'class-validator';
import { IsContactsValid } from '../../../validations/isContactsValid';

/* 
  Input type for register user
*/

@InputType({ description: 'Register a new user' })
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
  @IsEmail()
  email: string;

  @Field()
  password: string;

  @Field(() => [Roles])
  roles: Roles[];

  @Field(() => [ContactsUserInput])
  @IsContactsValid({ message: 'Ошибка валидации контактов!' })
  contacts: ContactsUserInput[];
}
