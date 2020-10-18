import bcrypt from 'bcryptjs';
import Auth from '../../auth/index';
import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';
import { User } from '../../models/index';
import { IUser, IContext } from '../../../interfaces';

const userResolver: IResolvers = {
  Query: {
    user: async (
      _,
      args: { slug: string },
      context: IContext
    ): Promise<IUser> => {
      try {
        Auth.isAuthenticated(context);
        const user = await User.findOne({ login: args.slug });

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
        Auth.isAuthenticated(context);

        const users = await User.find({});

        return users;
      } catch (error) {
        throw error;
      }
    },
    me: async (_, args, context: any) => {
      try {
        const user = await User.findById(context.req.userId)

        if (!user) {
          throw new AuthenticationError('Unauthenticated');
        }

        return user
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    createUser: async (
      _,
      args: {
        name: string;
        surname: string;
        patronymic: string;
        login: string;
        email: string;
        password: string;
        roles: string[];
      },
      context: IContext
    ): Promise<IUser> => {
      try {
        Auth.isAdmin(context);
        const candidate = await User.findOne({ email: args.email });

        if (candidate) {
          throw new ApolloError('User exists already!', '409 Conflict');
        }

        const hashedPassword = bcrypt.hashSync(args.password, 10);

        return new User({
          name: args.name,
          surname: args.surname,
          patronymic: args.patronymic,
          login: args.login,
          email: args.email,
          password: hashedPassword,
          roles: args.roles,
        }).save();
      } catch (error) {
        throw error;
      }
    },
    deleteUser: async (
      _,
      args: { _id: string },
      context: IContext
    ): Promise<IUser> => {
      try {
        Auth.isAdmin(context);
        const user = await User.findByIdAndRemove(args._id);

        if (!user) {
          throw new ApolloError('User does not exist!', '404 Not Found');
        }

        return user;
      } catch (error) {
        throw error;
      }
    },
  },
};

export default userResolver;
