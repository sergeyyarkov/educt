import { ApolloError } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';
import Auth from '../../auth/index';
import { Lesson, Course } from '../../models/index';
import { IContext, ICourse, ILesson } from '../../../interfaces';

const lessonResolver: IResolvers = {
  Query: {
    lesson: async (
      _,
      args: { _id: string },
      context: IContext
    ): Promise<ILesson> => {
      try {
        Auth.isAuthenticated(context);
        const lesson = await Lesson.findById(args._id);

        if (!lesson) {
          throw new ApolloError('Lesson does not exist!', '404 Not Found');
        }

        return lesson;
      } catch (error) {
        throw error;
      }
    },
    lessons: async (_, args, context: IContext): Promise<ILesson[]> => {
      try {
        Auth.isAuthenticated(context);

        const lessons = await Lesson.find({});

        return lessons;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createLesson: async (
      _,
      args: {
        title: string;
        description: string;
        date: string;
        content: string;
        courseId: string;
      },
      context: IContext
    ): Promise<ILesson> => {
      try {
        Auth.isAdmin(context);
        const course = await Course.findById(args.courseId);

        if (!course) {
          throw new ApolloError('That course does not exist!', '404 Not Found');
        }

        return new Lesson({
          title: args.title,
          description: args.description,
          date: args.date,
          content: args.content,
          courseId: args.courseId,
          publishedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }).save();
      } catch (error) {
        throw error;
      }
    },
    deleteLesson: async (
      _,
      args: { _id: string },
      context: IContext
    ): Promise<ILesson> => {
      try {
        Auth.isAdmin(context);
        const lesson = await Lesson.findByIdAndRemove(args._id);

        if (!lesson) {
          throw new ApolloError('Lesson does not exist!', '404 Not Found');
        }

        return lesson;
      } catch (error) {
        throw error;
      }
    },
  },
  Lesson: {
    course: async (
      parent: { courseId: string },
      args,
      context: IContext
    ): Promise<ICourse> => {
      try {
        Auth.isAuthenticated(context);
        const course = await Course.findById(parent.courseId);

        if (!course) {
          throw new ApolloError('Course does not exist!', '404 Not Found');
        }

        return course;
      } catch (error) {
        throw error;
      }
    },
  },
};

export default lessonResolver;
