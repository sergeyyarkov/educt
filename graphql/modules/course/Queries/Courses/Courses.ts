import { Resolver, Query, Authorized } from 'type-graphql';
import { Course } from '../../../../entities/Course';

/**
 *
 * Courses query resolver
 * Returns a list of courses
 * Authorized: USER
 *
 */

@Resolver()
export class CoursesResolver {
  // @Authorized()
  @Query(() => [Course], { description: 'Returns a list of courses' })
  async courses(): Promise<Course[]> {
    try {
      const courses = await Course.find({ });
      console.log(courses[0].lessons)
      return courses; 
    } catch (error) {
      throw error;
    }
  }
}
