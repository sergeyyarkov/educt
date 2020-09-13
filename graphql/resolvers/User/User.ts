import bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';
import { User } from '../../models/index';
import { assertAuth, assertAdmin } from '../../permissions/index';
import { IUser, IContext } from '../../../interfaces';

const userResolver: IResolvers = {
  Query: {
    user: async (_, { slug }: IUser, context: IContext): Promise<IUser> => {
      try {
        assertAuth(context);

        const user = await User.findOne({ login: slug });

        if (!user) {
          throw new ApolloError('User does not exist!', '404 Not Found');
        }

        return user;
      } catch (error) {
        throw error;
      }
    },
    users: async (_, args, context: IContext): Promise<IUser[]> => {
      try {
        assertAuth(context);
        const users = await User.find({});

        return users;
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    createUser: async (
      _,
      { name, surname, patronymic, login, email, password, roles }: IUser,
      context: IContext
    ): Promise<IUser> => {
      try {
        assertAuth(context);
        assertAdmin(context);

        const candidate = await User.findOne({ email });

        if (candidate) {
          throw new ApolloError('User exists already!', '409 Conflict');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        return new User({
          name,
          surname,
          patronymic,
          login,
          email,
          password: hashedPassword,
          roles,
        }).save();
      } catch (error) {
        throw error;
      }
    },
    deleteUser: async (_, { _id }: IUser, context: IContext): Promise<IUser> => {
      try {
        assertAuth(context);
        assertAdmin(context);

        const user = await User.findByIdAndRemove(_id);

        if (!user) {
          throw new ApolloError('User does not exist!', '404 Not Found');
        }

        return user
      } catch (error) {
        throw error;
      }
    }
  },
};

export default userResolver;
