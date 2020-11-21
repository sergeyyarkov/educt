import { Resolver, Query, Authorized, Arg } from 'type-graphql';
import { ApolloError } from 'apollo-server-express';
import { Lesson } from '../../../../entities/Lesson';

/**
 *
 * Lesson query resolver
 * Returns a current lesson by id
 * Authorized: USER
 *
 */

@Resolver()
export class LessonResolver {
  // @Authorized()
  @Query(() => Lesson, { description: 'Returns a current lesson by id' })
  async lesson(@Arg('id') id: number): Promise<Lesson> {
    try {
      const lesson = await Lesson.findOne(id, { relations: ['course'] })
      
      if (!lesson) {
        throw new ApolloError(
          'Такого урока не существует.',
          '404 Not Found'
        );
      }
      
      return lesson
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}
