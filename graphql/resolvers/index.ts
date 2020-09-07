import { IResolvers } from 'graphql-tools';

import helloResolver from './hello';
import usersResolver from './users';

const resolvers: IResolvers[] = [helloResolver, usersResolver];

export default resolvers;
