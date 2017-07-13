import {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import DirectorType from '../models/director.type';

import * as DirectorsService from '../services/directors.service';
import * as MoviesDirectorsService from '../services/movies-directors.service';

var addDirector = {
    type: DirectorType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        movies: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: (parentValues, args) => {
        return DirectorsService
            .persistNewDirector({ name: args.name })
            .then((persistedDirectorData) => {
                if (args.movies) {
                    return MoviesDirectorsService
                        .addMoviesToDirector(persistedDirectorData.id, args.movies)
                        .then(() => {
                            return persistedDirectorData;
                        });
                } else {
                    return persistedDirectorData;
                }
            })
            .catch((error) => {
                return error;
            });
    }
};

var updateDirector = {
    type: DirectorType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (parentValues, args) => {
        return DirectorsService
            .updateDirector(args)
            .then((updatedDirectorData) => {
                return updatedDirectorData;
            })
            .catch((error) => {
                return error;
            });
    }
};

var deleteDirector = {
    type: DirectorType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: (parentValues, args) => {
        return DirectorsService
            .deleteDirector(args.id)
            .then((deletedDirectorData) => {
                return deletedDirectorData;
            })
            .catch((error) => {
                return error;
            });
    }
};

var addMoviesToDirector = {
    type: DirectorType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        movies: { type:new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: (parentValues, args) => {
        return MoviesDirectorsService
            .addMoviesToDirector(args.id, args.movies)
            .then((persistedDirectorMoviesData) => {
                if (persistedDirectorMoviesData) {
                    return DirectorsService
                        .getDirectorsData(args.id)
                        .then(directorData => directorData);
                } else {
                    return [];
                }
            })
            .catch((error) => {
                return error;
            });
    }
};

var deleteDirectorMovies = {
    type: DirectorType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        movies: { type:new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: (parentValues, args) => {
        return MoviesDirectorsService
            .deleteDirectorMovies(args.id, args.movies)
            .then(() => {
                return DirectorsService
                    .getDirectorsData(args.id)
                    .then(directorData => directorData);
            })
            .catch((error) => {
                return error;
            });
    }
};

export {
    addDirector,
    updateDirector,
    deleteDirector,
    addMoviesToDirector,
    deleteDirectorMovies
};