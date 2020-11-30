import { Resolver, Query, Authorized, FieldResolver, Root, Ctx } from 'type-graphql';
import { IContext } from '../../../../../interfaces';
import { Course } from '../../../../entities/Course';
import { Lesson } from '../../../../entities/Lesson';
import { courseLoader } from '../../../../loaders/courseLoader';

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
  async course(@Root() lesson: Lesson, @Ctx() { courseLoader }: IContext) {
    const course = courseLoader.load(lesson.courseId)
    return course
  }
}
