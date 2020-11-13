import { ObjectType, ID, Field } from 'type-graphql';

@ObjectType()
export class AuthData {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  patronymic: string;

  @Field()
  token: string;
}
