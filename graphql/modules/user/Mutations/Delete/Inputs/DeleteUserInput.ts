import { InputType, Field } from 'type-graphql';

/* 
  Input type for delete user
*/

@InputType({ description: 'Delete user by id' })
export class DeleteUserInput {
  @Field()
  id: number;
}
