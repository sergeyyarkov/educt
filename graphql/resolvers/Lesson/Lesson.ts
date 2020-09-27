import { ApolloError } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';
import Auth from '../../auth/index'
import { Lesson, Course } from '../../models/index';
import { IContext, ILesson } from '../../../interfaces';

const lessonResolver: IResolvers = {
  Query: {
    lesson: async (
      _,
      { _id }: ILesson,
      context: IContext
    ): Promise<ILesson> => {
      try {
        Auth.isAuthenticated(context)

        const lesson = await Lesson.findById(_id);

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
        Auth.isAuthenticated(context)

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
      { title, description, date, content, courseId }: ILesson,
      context: IContext
    ): Promise<ILesson> => {
      try {
        Auth.isAdmin(context)

        const course = await Course.findById(courseId);

        if (!course) {
          throw new ApolloError('That course does not exist!', '404 Not Found');
        }

        return new Lesson({
          title,
          description,
          date,
          content,
          courseId,
          publishedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }).save();
      } catch (error) {
        throw error;
      }
    },
    deleteLesson: async (_, { _id }: ILesson, context: IContext): Promise<ILesson> => {
      try {
        Auth.isAdmin(context)

        const lesson = await Lesson.findByIdAndRemove(_id)

        if (!lesson) {
          throw new ApolloError('Lesson does not exist!', '404 Not Found');
        }

        return lesson
      } catch (error) {
        throw error;
      }
    }
  },
  Lesson: {
    course: ({ courseId }: ILesson) => Course.findById(courseId),
  },
};

export default lessonResolver;
