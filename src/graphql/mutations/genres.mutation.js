import {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import GenreType from '../models/genre.type';
import * as GenresService from '../services/genres.service';
import * as MoviesGenresService from '../services/movies-genres.service';

var addGenre = {
    type: GenreType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        movies: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: (parentValues, args) => {
        return GenresService
            .persistNewGenre({ name: args.name })
            .then((persistedGenreData) => {
                if (args.movies) {
                    return MoviesGenresService
                        .addMoviesToGenre(persistedGenreData.id, args.movies)
                        .then(() => {
                            return persistedGenreData;
                        });
                } else {
                    return persistedGenreData;
                }
            })
            .catch((error) => {
                return error;
            });
    }
};

var updateGenre = {
    type: GenreType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (parentValues, args) => {
        return GenresService
            .updateGenre(args)
            .then((updatedGenreData) => {
                return updatedGenreData;
            })
            .catch((error) => {
                return error;
            });
    }
};

var deleteGenre = {
    type: GenreType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: (parentValues, args) => {
        return GenresService
            .deleteGenre(args.id)
            .then((deletedGenreData) => {
                return deletedGenreData;
            })
            .catch((error) => {
                return error;
            });
    }
};

var addMoviesToGenre = {
    type: GenreType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        movies: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: (parentValues, args) => {
        return MoviesGenresService
            .addMoviesToGenre(args.id, args.movies)
            .then((persistedGenreMoviesData) => {
                if (persistedGenreMoviesData) {
                    return GenresService
                        .getGenresData(args.id)
                        .then(genreData => genreData);
                } else {
                    return [];
                }
            })
            .catch((error) => {
                return error;
            });
    }
};

var deleteGenreMovies = {
    type: GenreType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        movies: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: (parentValues, args) => {
        return MoviesGenresService
            .deleteGenreMovies(args.id, args.movies)
            .then(() => {
                return GenresService
                    .getGenresData(args.id)
                    .then(genreData => genreData);
            })
            .catch((error) => {
                return error;
            });
    }
};

export {
    addGenre,
    updateGenre,
    deleteGenre,
    addMoviesToGenre,
    deleteGenreMovies
};