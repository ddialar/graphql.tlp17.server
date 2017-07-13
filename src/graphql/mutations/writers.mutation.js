import {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import WriterType from '../models/writer.type';

import * as WritersService from '../services/writers.service';
import * as MoviesWritersService from '../services/movies-writers.service';

var addWriter = {
    type: WriterType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        movies: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: (parentValues, args) => {
        return WritersService
            .persistNewWriter({ name: args.name })
            .then((persistedWriterData) => {
                if (args.movies) {
                    return MoviesWritersService
                        .addMoviesToWriter(persistedWriterData.id, args.movies)
                        .then(() => {
                            return persistedWriterData;
                        });
                } else {
                    return persistedWriterData;
                }
            })
            .catch((error) => {
                return error;
            });
    }
};

var updateWriter = {
    type: WriterType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (parentValues, args) => {
        return WritersService
            .updateWriter(args)
            .then((persistedData) => {
                return persistedData;
            })
            .catch((error) => {
                return error;
            });
    }
};

var deleteWriter = {
    type: WriterType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: (parentValues, args) => {
        return WritersService
            .deleteWriter(args.id)
            .then((deletedWriterData) => {
                return deletedWriterData;
            })
            .catch((error) => {
                return error;
            });
    }
};

var addMoviesToWriter = {
    type: WriterType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        movies: { type:new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: (parentValues, args) => {
        return MoviesWritersService
            .addMoviesToWriter(args.id, args.movies)
            .then((persistedWriterMoviesData) => {
                if (persistedWriterMoviesData) {
                    return WritersService
                        .getWritersData(args.id)
                        .then(writerData => writerData);
                } else {
                    return [];
                }
            })
            .catch((error) => {
                return error;
            });
    }
};

var deleteWriterMovies = {
    type: WriterType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        movies: { type:new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: (parentValues, args) => {
        return MoviesWritersService
            .deleteWriterMovies(args.id, args.movies)
            .then(() => {
                return WritersService
                    .getWritersData(args.id)
                    .then(writerData => writerData);
            })
            .catch((error) => {
                return error;
            });
    }
};

export {
    addWriter,
    updateWriter,
    deleteWriter,
    addMoviesToWriter,
    deleteWriterMovies
};