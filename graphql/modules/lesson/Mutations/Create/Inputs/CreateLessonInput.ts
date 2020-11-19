import { InputType, Field } from 'type-graphql'

/* 
  Input type for create course
*/

@InputType({ description: 'Create lesson' })
export class CreateLessonInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  content: string;

  @Field()
  publishedAt: Date;

  @Field()
  updatedAt?: Date;

  @Field()
  courseId: number;
}
