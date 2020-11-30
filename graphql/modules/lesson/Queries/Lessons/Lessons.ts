import { Resolver, Query, Authorized, FieldResolver, Root } from 'type-graphql';
import { Course } from '../../../../entities/Course';
import { Lesson } from '../../../../entities/Lesson';

/**
 *
 * Lessons query resolver
 * Returns a list of lessons
 * Authorized: USER
 *
 */

@Resolver(Lesson)
export class LessonsResolver {
  // @Authorized()
  @Query(() => [Lesson], { description: 'Returns a list of lessons' })
  async lessons(): Promise<Lesson[]> {
    try {
      const lessons = await Lesson.find({});
      return lessons;
    } catch (error) {
      throw error;
    }
  }

  @FieldResolver()
  async course(@Root() lesson: Lesson) {
    const course = await Course.findOne(lesson.courseId)
    return course
  }
}
