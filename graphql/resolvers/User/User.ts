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
        const user = await User.findById(context.req.userId);

        if (!user) {
          throw new AuthenticationError('Unauthenticated');
        }

        return user;
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
        contacts: { name: string, link: string }[]
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
          contacts: args.contacts
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
    updateContacts: async (
      _,
      args: { contacts: { name: string, link: string }[] },
      context: IContext
    ) => {
      try {
        const user = await User.findById(context.req.userId);
        const telegramContactArg = args.contacts.find(contact => contact.name === 'telegram')
        const vkContactArg = args.contacts.find(contact => contact.name === 'vk')
        const telegramPattern = /.*\B@(?=\w{5,64}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/gm
        const vkPattern = /^(https?:\/\/)?(www\.)?vk\.com\/(\w|\d)+?\/?$/
        const isTelegramContactValid = () => telegramContactArg?.link.match(telegramPattern) && telegramContactArg.link.length <= 100
        const isVkContactValid = () => vkContactArg?.link.match(vkPattern) && vkContactArg.link.length <= 200

        if (!user) {
          throw new AuthenticationError('Unauthenticated');
        }

        if (telegramContactArg && vkContactArg) {
          if (isTelegramContactValid() && isVkContactValid()) {
            return await User.findByIdAndUpdate(context.req.userId, { contacts: args.contacts }, { new: true })
          }
          throw new ApolloError('Invalid fields!', '400 Bad request');
        }

        if (telegramContactArg || vkContactArg) { 
          if (isTelegramContactValid() || isVkContactValid()) {
            return await User.findByIdAndUpdate(context.req.userId, { contacts: args.contacts }, { new: true })
          }
          throw new ApolloError('Invalid fields!', '400 Bad request');
        }
        
        return await User.findByIdAndUpdate(context.req.userId, { contacts: [] }, { new: true })
      } catch (error) {
        throw error
      }
    }
  },
};

export default userResolver;
