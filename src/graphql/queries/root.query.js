import { GraphQLObjectType } from 'graphql';

import * as DirectorsQuery from './directors.query';
import * as WritersQuery from './writers.query';
import * as ActorsQuery from './actors.query';
import * as GenresQuery from './genres.query';
import * as MoviesQuery from './movies.query';

var RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        allDirectors: DirectorsQuery.allQuery,
        directorsById: DirectorsQuery.byIdQuery,

        allWriters: WritersQuery.allQuery,
        writersById: WritersQuery.byIdQuery,

        allActors: ActorsQuery.allQuery,
        actorsById: ActorsQuery.byIdQuery,

        allGenres: GenresQuery.allQuery,
        genresById: GenresQuery.byIdQuery,

        allMovies: MoviesQuery.allQuery,
        moviesById: MoviesQuery.byIdQuery,
    })
});

export default RootQueryType;