import { Resolver, Mutation, Arg, Authorized } from 'type-graphql';
import { Course } from '../../../../entities/Course'
import { CreateCourseInput } from './Inputs/CreateCourseInput';
import { ApolloError } from 'apollo-server-express';

/**
 *
 * Create course mutation resolver
 * Creates a new course and returns it
 * Authorized: ADMIN
 *
 */

@Resolver()
export class CreateCourseResolver {
  // @Authorized('ADMIN')
  @Mutation(() => Course, { description: 'Creates a new course and returns it' })
  async createCourse(
    @Arg('input')
    { title, description, publishedAt, updatedAt }: CreateCourseInput
  ) {
    try {
      const course = await Course.create({
        title,
        description,
        lessons: [],
        publishedAt,
        updatedAt,
      }).save()

      return course
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}
