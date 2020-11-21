import { Resolver, Mutation, Arg, Authorized } from 'type-graphql';
import { ApolloError } from 'apollo-server-express';
import { Lesson } from '../../../../entities/Lesson';

/**
 *
 * Delete lesson mutation resolver
 * Removes the lesson and returns it
 * Authorized: ADMIN
 *
 */

@Resolver()
export class DeleteLessonResolver {
  // @Authorized('ADMIN')
  @Mutation(() => Lesson, { description: 'Removes the lesson and returns it' })
  async deleteLesson(@Arg('id') id: number): Promise<Lesson> {
    try {
      const lesson = await Lesson.findOne(id, { relations: ['course'] });

      if (!lesson) {
        throw new ApolloError(
          'Такого урока не существует.',
          '404 Not Found'
        );
      }

      lesson.remove();

      return lesson;
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}
