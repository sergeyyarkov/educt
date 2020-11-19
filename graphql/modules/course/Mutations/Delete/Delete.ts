import { Resolver, Mutation, Arg, Authorized, FieldResolver } from 'type-graphql';
import {getConnection} from 'typeorm'
import { Course } from '../../../../entities/Course';
import { ApolloError } from 'apollo-server-express';
import { Lesson } from '../../../../entities/Lesson';

/**
 *
 * Delete course mutation resolver
 * Removes the course and returns it
 * Authorized: ADMIN
 *
 */

@Resolver()
export class DeleteCourseResolver {
  // @Authorized('ADMIN')
  @Mutation(() => Course, { description: 'Removes the course and returns it' })
  async deleteCourse(@Arg('id') id: number): Promise<Course> {
    try {
      const course = await Course.findOne(id);

      if (!course) {
        throw new ApolloError(
          'Такого курса не существует.',
          '404 Not Found'
        );
      }

      course.remove();

      return course;
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}
