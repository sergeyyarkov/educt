import { ApolloError } from 'apollo-server-express';
import { Lesson, Course } from '../../models/index';
import { IResolvers } from 'graphql-tools';
import { IContext, ICourse, ILesson } from '../../../interfaces';
import { assertAuth, assertAdmin } from '../../permissions/index';

const lessonResolver: IResolvers = {
  Query: {
    lesson: async (
      _,
      { _id }: ILesson,
      context: IContext
    ): Promise<ILesson> => {
      try {
        assertAuth(context);
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
        assertAuth(context);
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
        assertAuth(context);
        assertAdmin(context);

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
  },
  Lesson: {
    course: ({ courseId }: ILesson) => Course.findById(courseId),
  },
};

export default lessonResolver;
