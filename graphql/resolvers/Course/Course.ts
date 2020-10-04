import { ApolloError } from 'apollo-server-express';
import Auth from '../../auth/index';
import { Course, Lesson, User } from '../../models/index';
import { IResolvers } from 'graphql-tools';
import { IContext, ICourse, ILesson } from '../../../interfaces';

const courseResolver: IResolvers = {
  Query: {
    course: async (
      _,
      { _id }: ILesson,
      context: IContext
    ): Promise<ICourse> => {
      try {
        Auth.isAuthenticated(context);
        const course = await Course.findById(_id);

        if (!course) {
          throw new ApolloError('Course does not exist!', '404 Not Found');
        }

        return course;
      } catch (error) {
        throw error;
      }
    },
    courses: async (_, args, context: IContext): Promise<ICourse[]> => {
      try {
        Auth.isAuthenticated(context);
        const courses = await Course.find({});

        return courses;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createCourse: async (
      _,
      { title, description, teacherId, studentIds }: ICourse,
      context: IContext
    ): Promise<ICourse> => {
      try {
        Auth.isAdmin(context);

        const teacher = await User.findById(teacherId);
        const students = await User.find().where('_id').in(studentIds).exec();

        if (!teacher) {
          throw new ApolloError('Teacher does not exist!', '404 Not Found');
        }

        if (students.length < studentIds.length) {
          throw new ApolloError(
            'Some student does not exist!',
            '404 Not Found'
          );
        }

        return new Course({
          title,
          description,
          teacherId,
          studentIds,
          publishedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }).save();
      } catch (error) {
        throw error;
      }
    },
    deleteCourse: async (
      _,
      { _id }: ICourse,
      context: IContext
    ): Promise<ICourse> => {
      try {
        Auth.isAdmin(context);

        const course = await Course.findByIdAndRemove(_id);

        if (!course) {
          throw new ApolloError('Course does not exist!', '404 Not Found');
        }

        return course;
      } catch (error) {
        throw error;
      }
    },
  },
  Course: {
    lessons: ({ _id }) => Lesson.find({ courseId: _id }),
    teacher: ({ teacherId }) => User.findById(teacherId),
    students: ({ studentIds }) =>
      User.find().where('_id').in(studentIds).exec(),
  },
};

export default courseResolver;
