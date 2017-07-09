import axios from 'axios';
import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} from 'graphql';

var WriterType = new GraphQLObjectType({
    name: 'Writer',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString }
    })
});

export default WriterType;