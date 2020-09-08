import { IResolvers } from 'graphql-tools';

import authResolver from './Auth/Auth';
import helloResolver from './hello';

const resolvers: IResolvers[] = [authResolver, helloResolver];

export default resolvers;
