import { InputType, Field } from 'type-graphql'

/* 
  Input type for create course
*/

@InputType({ description: 'Create course' })
export class CreateCourseInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  publishedAt: Date;

  @Field()
  updatedAt?: Date;
}
