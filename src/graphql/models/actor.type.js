import axios from 'axios';
import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLList
} from 'graphql';

import * as MoviesActorsService from '../services/movies-actors.service';

var ActorType = new GraphQLObjectType({
    name: 'Actor',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        picture: { type: GraphQLString },
        born: { type: GraphQLString },
        height: { type: GraphQLFloat },
        country: { type: GraphQLString },
        movies: {
            type: new GraphQLList(MovieType),
            resolve: (parentValues, args) => {
                return MoviesActorsService.getMoviesDataByActorId(parentValues.id);
            }
        }
    })
});

export default ActorType;

import MovieType from './movie.type';