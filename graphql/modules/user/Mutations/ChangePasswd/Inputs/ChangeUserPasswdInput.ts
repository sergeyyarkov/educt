import { InputType, Field } from 'type-graphql';

/*  Input type for change user password  */

@InputType()
export class ChangeUserPasswdInput {
  @Field()
  oldPasswd: string;

  @Field()
  newPasswd: string;
}
