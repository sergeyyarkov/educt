import { Resolver, Query, Authorized, FieldResolver, Root } from 'type-graphql';
import { ApolloError } from 'apollo-server-express';
import { Course } from '../../../../entities/Course';

/**
 *
 * Courses query resolver
 * Returns a list of courses
 * Authorized: USER
 *
 */

@Resolver(Course)
export class CoursesResolver {
  // @Authorized()
  @Query(() => [Course], { description: 'Returns a list of courses' })
  async courses(): Promise<Course[]> {
    try {
      const courses = await Course.find({  });
      return courses; 
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}
