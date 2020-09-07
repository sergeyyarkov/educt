import { IResolvers } from 'graphql-tools';

const usersResolver: IResolvers = {
  Query: {
    users: (): Array<string> => ['user1', 'user2'],
  },
};

export default usersResolver;
