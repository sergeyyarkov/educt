import { Resolver, Query, Authorized, FieldResolver } from 'type-graphql';
import { Lesson } from '../../../../entities/Lesson';

/**
 *
 * Lessons query resolver
 * Returns a list of lessons
 * Authorized: USER
 *
 */

@Resolver()
export class LessonsResolver {
  // @Authorized()
  @Query(() => [Lesson], { description: 'Returns a list of lessons' })
  async lessons(): Promise<Lesson[]> {
    try {
      const lessons = await Lesson.find({ relations: ['course'] });
      return lessons;
    } catch (error) {
      throw error;
    }
  }
}
