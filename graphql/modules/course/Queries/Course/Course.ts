import { Resolver, Query, Authorized, Arg, FieldResolver } from 'type-graphql';
import { ApolloError } from 'apollo-server-express';
import { Course } from '../../../../entities/Course';

/**
 *
 * Course query resolver
 * Returns a current course by id
 * Authorized: USER
 *
 */

@Resolver(Course)
export class CourseResolver {
  // @Authorized()
  @Query(() => Course, { description: 'Returns a current course by id' })
  async course(@Arg('id') id: number): Promise<Course> {
    try {
      const course = await Course.findOne(id)
      
      if (!course) {
        throw new ApolloError(
          'Такого курса не существует.',
          '404 Not Found'
        );
      }
      
      return course
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}
