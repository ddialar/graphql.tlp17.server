import axios from 'axios';
import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString
} from 'graphql';

var ActorType = new GraphQLObjectType({
    name: 'Actor',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        picture: { type: GraphQLString },
        born: { type: GraphQLString },
        height: { type: GraphQLFloat },
        country: { type: GraphQLString }
    })
});

export default ActorType;