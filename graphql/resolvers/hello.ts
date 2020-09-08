const helloResolver = {
  Query: {
    hello: (_: any, args: any, context: any): string => {
      if (!context.isAuth) {
        throw new Error('Unauthenticated');
      }

      return 'hello world!';
    },
  },
};

export default helloResolver;
