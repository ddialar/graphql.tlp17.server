import { GraphQLObjectType } from 'graphql';

import * as DirectorsQuery from './directors.query';

var RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        allDirectors: DirectorsQuery.allQuery,
        directorsById: DirectorsQuery.byIdQuery,

        // allWriters: WritersQuery.allQuery,
        // writersById: WritersQuery.byIdQuery,

        // allActors: ActorsQuery.allQuery,
        // actorsById: ActorsQuery.byIdQuery,

        // allGenres: GenresQuery.allQuery,
        // genresById: GenresQuery.byIdQuery,

        // allMovies: MoviesQuery.allQuery,
        // moviesById: MoviesQuery.byIdQuery,
    })
});

export default RootQueryType;