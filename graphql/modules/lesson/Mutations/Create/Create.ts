import { Resolver, Mutation, Arg, Authorized } from 'type-graphql';
import { Course } from '../../../../entities/Course'
import { Lesson } from '../../../../entities/Lesson'
import { CreateLessonInput } from './Inputs/CreateLessonInput';
import { ApolloError } from 'apollo-server-express';

/**
 *
 * Create lesson mutation resolver
 * Creates a new lesson and returns it
 * Authorized: ADMIN
 *
 */

@Resolver()
export class CreateLessonResolver {
  // @Authorized('ADMIN')
  @Mutation(() => Lesson, { description: 'Creates a new lesson and returns it' })
  async createLesson(
    @Arg('input')
    { title, description, content, publishedAt, updatedAt, courseId }: CreateLessonInput
  ) {
    try {
      const course = await Course.findOne(courseId);

      if (!course) {
        throw new ApolloError(
          'Такого курса не существует.',
          '404 Not Found'
        );
      }

      const lesson = await Lesson.create({
        title,
        description,
        content,
        publishedAt,
        updatedAt,
        course
      }).save()

      return lesson
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}
