import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} from 'graphql';

import * as MoviesDirectorsService from '../services/movies-directors.service';

var DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        movies: {
            type: new GraphQLList(MovieType),
            resolve: (parentValues, args) => {
                return MoviesDirectorsService.getMoviesDataByDirectorId(parentValues.id);
            }
        }
    })
});

export default DirectorType;

import MovieType from './movie.type';