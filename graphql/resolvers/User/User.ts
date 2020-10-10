import bcrypt from 'bcryptjs';
import Auth from '../../auth/index';
import jwt from 'jsonwebtoken'
import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';
import { User } from '../../models/index';
import { IUser, IContext, IToken, ISignedUserData } from '../../../interfaces';

const userResolver: IResolvers = {
  Query: {
    user: async (_, { slug }: IUser, context: IContext): Promise<IUser> => {
      try {
        Auth.isAuthenticated(context);

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
        Auth.isAuthenticated(context);

        const users = await User.find({});

        return users;
      } catch (error) {
        throw error;
      }
    },
    getCurrentUserData: (_, { token }: IToken, context: IContext): void => {
      try {
        Auth.isAuthenticated(context);
        
        return jwt.verify(token, process.env.SECRET_KEY as string, (err, data) => {
          if (err) {
            throw new AuthenticationError('Unauthenticated');
          } else {
            return data
          }
        })
      } catch (error) {
        throw error;
      }
    }
  },

  Mutation: {
    createUser: async (
      _,
      { name, surname, patronymic, login, email, password, roles }: IUser,
      context: IContext
    ): Promise<IUser> => {
      try {
        Auth.isAdmin(context);

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
    deleteUser: async (
      _,
      { _id }: IUser,
      context: IContext
    ): Promise<IUser> => {
      try {
        Auth.isAdmin(context);

        const user = await User.findByIdAndRemove(_id);

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
