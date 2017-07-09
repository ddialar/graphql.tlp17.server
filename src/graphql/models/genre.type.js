import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} from 'graphql';

import * as MoviesGenresService from '../services/movies-genres.service';

var GenreType = new GraphQLObjectType({
    name: 'Genre',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        movies: {
            type: new GraphQLList(MovieType),
            resolve: (parentValues, args) => {
                return MoviesGenresService.getMoviesDataByGenreId(parentValues.id);
            }
        }
    })
});

export default GenreType;

import MovieType from './movie.type';