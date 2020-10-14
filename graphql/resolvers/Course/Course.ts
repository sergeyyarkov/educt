import { ApolloError } from 'apollo-server-express';
import Auth from '../../auth/index';
import { Course, Lesson, User } from '../../models/index';
import { IResolvers } from 'graphql-tools';
import { IContext, ICourse, ILesson, IUser } from '../../../interfaces';

const courseResolver: IResolvers = {
  Query: {
    course: async (
      _,
      args: { _id: string },
      context: IContext
    ): Promise<ICourse> => {
      try {
        Auth.isAuthenticated(context);
        const course = await Course.findById(args._id);

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
      args: {
        title: string; 
        description: string;
        teacherId: string;
        studentIds: string[];
      },
      context: IContext
    ): Promise<ICourse> => {
      try {
        Auth.isAdmin(context);

        const teacher = await User.findById(args.teacherId);
        const students = await User.find().where('_id').in(args.studentIds).exec();

        if (!teacher) {
          throw new ApolloError('Teacher does not exist!', '404 Not Found');
        }

        if (students.length < args.studentIds.length) {
          throw new ApolloError(
            'Some student does not exist!',
            '404 Not Found'
          );
        }

        return new Course({
          title: args.title,
          description: args.description,
          teacherId: args.teacherId,
          studentIds: args.studentIds,
          publishedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }).save();
      } catch (error) {
        throw error;
      }
    },
    deleteCourse: async (
      _,
      args: { _id: string; },
      context: IContext
    ): Promise<ICourse> => {
      try {
        Auth.isAdmin(context);

        const course = await Course.findByIdAndRemove(args._id);

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
    lessons: async (parent: { _id: string; }, args, context: IContext): Promise<ILesson[]> => {
      try {
        Auth.isAuthenticated(context)
        const lessons = await Lesson.find({ courseId: parent._id })

        return lessons
      } catch (error) {
        throw error
      }
    },
    teacher: async (parent: { teacherId: string }, args, context: IContext): Promise<IUser> => {
      try {
        Auth.isAuthenticated(context)
        const teacher = await User.findById(parent.teacherId);

        if (!teacher) {
          throw new ApolloError('Teacher does not exist!', '404 Not Found');
        }

        return teacher;
      } catch (error) {
        throw error
      }
    },
    students: async (parent: { studentIds: string[] }, args, context: IContext): Promise<IUser[]> => {
      try {
        Auth.isAuthenticated(context)
        const students = await User.find().where('_id').in(parent.studentIds).exec()

        return students
      } catch (error) {
        throw error
      }
    }
  },
};

export default courseResolver;
