import {
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import MovieType from '../models/movie.type';

import * as MoviesService from '../services/movies.service';
import * as MoviesDirectorsService from '../services/movies-directors.service';
import * as MoviesWritersService from '../services/movies-writers.service';
import * as MoviesActorsService from '../services/movies-actors.service';
import * as MoviesGenresService from '../services/movies-genres.service';

import * as CommonService from '../services/common.service';

const COPLEX_MOVIE_FIELDS = [
    'directors',
    'writers',
    'actors',
    'genres'
];

const PROCESS_COMPLEX_MOVIE_FIELDS = {
    'directors': { persist: (movieId, directorsIds) => { return MoviesDirectorsService.addDirectorsToMovie(movieId, directorsIds); } },
    'writers': { persist: (movieId, writersIds) => { return MoviesWritersService.addWritersToMovie(movieId, writersIds); } },
    'actors': { persist: (movieId, actorsIds) => { return MoviesActorsService.addActorsToMovie(movieId, actorsIds); } },
    'genres': { persist: (movieId, genresIds) => { return MoviesGenresService.addGenresToMovie(movieId, genresIds); } }
};

var addMovie = {
    type: MovieType,
    args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        poster_image: { type: GraphQLString },
        duration: { type: GraphQLInt },
        rating: { type: GraphQLFloat },
        classification: { type: GraphQLString },
        year: { type: GraphQLString },
        directors: { type: new GraphQLList(GraphQLInt) },
        writers: { type: new GraphQLList(GraphQLInt) },
        actors: { type: new GraphQLList(GraphQLInt) },
        genres: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: (parentValues, args) => {
        let movieBasicFieldsObject = _getMovieBasicFieldsAsObject(args);
        let movieComplexFields = _getMovieComplexFieldsAsObject(args);

        return MoviesService
            .persistNewMovie(movieBasicFieldsObject)
            .then((persistedMovieData) => {
                if (movieComplexFields) {
                    let persistedComplexFields = Object.keys(movieComplexFields).map((fieldName) => {
                        return PROCESS_COMPLEX_MOVIE_FIELDS[fieldName]
                            .persist(persistedMovieData.id, movieComplexFields[fieldName]);
                    });

                    return CommonService
                        .runAllAsyncRequests(persistedComplexFields, 'Persisting movie complex fields')
                        .then(() => {
                            return persistedMovieData;
                        });
                } else {
                    return persistedMovieData;
                }
            })
            .catch((error) => {
                return error;
            });
    }
};

var _getMovieBasicFieldsAsObject = (rawFields) => {
    let obtainedFiedlNames = Object.keys(rawFields).filter((fieldName) => {
        return COPLEX_MOVIE_FIELDS.indexOf(fieldName) < 0;
    });

    return _getFieldsContent(rawFields, obtainedFiedlNames);
};

var _getMovieComplexFieldsAsObject = (rawFields) => {
    let obtainedFiedlNames = Object.keys(rawFields).filter((fieldName) => {
        return COPLEX_MOVIE_FIELDS.indexOf(fieldName) >=0;
    });
    
    return _getFieldsContent(rawFields, obtainedFiedlNames);
};

var _getFieldsContent = (rawFields, selectedFields) => {
    return selectedFields.reduce((previousValue, currentValue) => {
        previousValue[currentValue] = rawFields[currentValue];
        return previousValue;
    }, {});
};

var updateMovie = {
    type: MovieType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        poster_image: { type: GraphQLString },
        duration: { type: GraphQLInt },
        rating: { type: GraphQLFloat },
        classification: { type: GraphQLString },
        year: { type: GraphQLString }
    },
    resolve: (parentValues, args) => {
        return MoviesService
            .updateMovie(args)
            .then((persistedData) => {
                return persistedData;
            })
            .catch((error) => {
                return error;
            });
    }
};

var deleteMovie = {
    type: MovieType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: (parentValues, args) => {
        return MoviesService
            .deleteMovie(args.id)
            .then((deletedMovieData) => {
                return deletedMovieData;
            })
            .catch((error) => {
                return error;
            });
    }
};

export {
    addMovie,
    updateMovie,
    deleteMovie
};