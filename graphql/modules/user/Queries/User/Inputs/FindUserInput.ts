import { InputType, Field } from 'type-graphql';

/* 
  Input type for find user
*/

@InputType({ description: 'Find user by slug or id' })
export class FindUserInput {
  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  id?: number;
}
