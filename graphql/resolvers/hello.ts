import { IResolvers } from 'graphql-tools';

const helloResolver: IResolvers = {
  Query: {
    hello: (): string => 'Hello world!',
  },
};

export default helloResolver;
