import bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';
import { User } from '../../models/index';
import { assertAuth } from '../../permissions/index';
import { IUser, IContext } from '../../../interfaces';

const userResolver: IResolvers = {
  Mutation: {
    createUser: async (
      _,
      { name, email, password, roles }: IUser,
      context: IContext
    ) => {
      try {
        assertAuth(context);

        const candidate = await User.findOne({ email });

        if (candidate) {
          throw new ApolloError('User exists already!', '409 Conflict');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        return new User({
          name,
          email,
          password: hashedPassword,
          roles,
        }).save();
      } catch (error) {
        throw error;
      }
    },
  },
};

export default userResolver;
