import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} from 'graphql';

var DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString }
    })
});

export default DirectorType;