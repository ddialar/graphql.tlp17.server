import { GraphQLSchema } from 'graphql';

import RootQueryType from './queries/root.query';

export default new GraphQLSchema({
    query: RootQueryType
});

