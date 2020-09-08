import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IResolvers } from 'graphql-tools';
import { User } from '../../models/index';

const authResolver: IResolvers = {
  Query: {
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('User doesnt exist!');
        }

        const validate = await bcrypt.compare(password, user.password);

        if (!validate) {
          throw new Error('Incorrent password!');
        }

        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.SECRET_KEY as string,
          {
            expiresIn: '1h',
          }
        );

        return { userId: user._id, token, tokenExpiration: 1 };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password }, context: any) => {
      try {
        if (!context.isAuth) {
          throw new Error('Unauthenticated!');
        }

        const candidate = await User.findOne({ email });

        if (candidate) {
          throw new Error('User exists already!');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        return new User({
          name,
          email,
          password: hashedPassword,
        }).save();
      } catch (error) {
        throw error;
      }
    },
  },
};

export default authResolver;
