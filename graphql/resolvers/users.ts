const usersResolver = {
  Query: {
    users: (): Array<string> => ['user1', 'user2'],
  },
};

export default usersResolver;
