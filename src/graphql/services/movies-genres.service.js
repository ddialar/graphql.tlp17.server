import axios from 'axios';

import * as MoviesService from './movies.service';
import * as GenresService from './genres.service';
import * as CommonService from './common.service';

var addMoviesToGenre = (genreId, newMoviesIds) => {
    return _getMovieGenreRelationshipsByGenreId(genreId)
        .then((relationships) => {
            let persistedMovieIds = relationships
                .map((movieGenrePair) => {
                    return movieGenrePair.movieId;
                });

            let moviesIdsToBePersisted = newMoviesIds
                .filter((newMovieId) => {
                    return (persistedMovieIds.indexOf(newMovieId) < 0);
                });

            if (moviesIdsToBePersisted) {
                let relationshipsToBePersisted = moviesIdsToBePersisted.map((movieId) => {
                    return { genreId: genreId, movieId: movieId };
                });

                return _persistNewMovieGenreRelationships(relationshipsToBePersisted)
                    .then(presistedRelationships => presistedRelationships);
            } else {
                console.log(`[ WARN  ] - No movies are going to be bound with the genre with id ${genreId}`); 
                return [];
            }
        })
        .catch(() => {
            return [];
        });
};

var addGenresToMovie = (movieId, newGenresIds) => {
    return _getMovieGenreRelationshipsByMovieId(movieId)
        .then((relationships) => {
            let persistedGenreIds = relationships
                .map((movieGenrePair) => {
                    return movieGenrePair.genreId;
                });

            let genresIdsToBePersisted = newGenresIds
                .filter((newGenreId) => {
                    return (persistedGenreIds.indexOf(newGenreId) < 0);
                });

            if (genresIdsToBePersisted) {
                let relationshipsToBePersisted = genresIdsToBePersisted.map((genreId) => {
                    return { genreId: genreId, movieId: movieId };
                });

                return _persistNewMovieGenreRelationships(relationshipsToBePersisted)
                    .then(presistedRelationships => presistedRelationships);
            } else {
                console.log(`[ WARN  ] - No genres are going to be bound with the movie with id ${movieId}`); 
                return [];
            }
        })
        .catch(() => {
            return [];
        });
};

var _persistNewMovieGenreRelationships = (relationshipsToBePersisted) => {
    let asyncRequests = CommonService.generateAsyncPostRequests('movies_genres', relationshipsToBePersisted);
    return CommonService.runAllAsyncRequests(asyncRequests, 'Persisting movie-genre relationships');
};

var deleteGenreMovies = (genreId, moviesIds) => {
    return _getMovieGenreRelationshipsByGenreId(genreId)
        .then((relationships) => {
            let relationshipIdsToBeDeleted = relationships
                .filter((movieGenrePair) => {
                    return (moviesIds.indexOf(movieGenrePair.movieId) >= 0);
                })
                .map((movieGenrePairToBeDeleted) => {
                    return movieGenrePairToBeDeleted.id;
                });

            if (relationshipIdsToBeDeleted) {
                return _deleteMovieGenreRelationships(relationshipIdsToBeDeleted)
                    .then(presistedRelationships => presistedRelationships);
            } else {
                console.log(`[ WARN  ] - No movie-director relationships are going to be deleted for the genre with id ${genreId}`); 
                return [];
            }
        })
        .catch(() => {
            return [];
        });
};

var _deleteMovieGenreRelationships = (relationshipIdsToBeDeleted) => {
    let asyncRequests = CommonService.generateAsyncDeleteRequests('movies_genres', relationshipIdsToBeDeleted);
    return CommonService.runAllAsyncRequests(asyncRequests, 'Deleting movie-genre relationships');
};

var getMoviesDataByGenreId = (genreId) => {
    return _getMovieGenreRelationshipsByGenreId(genreId)
        .then((relationships) => {
            return MoviesService.getRelatedMovies(relationships);
        })
        .catch((error) => {
            return error;
        });
};

var getGenresDataByMovieId = (movieId) => {
    return _getMovieGenreRelationshipsByMovieId(movieId)
        .then((relationships) => {
            return GenresService.getGenresDataFromMovieRelationships(relationships);
        })
        .catch((error) => {
            return error;
        });
};

var _getMovieGenreRelationshipsByMovieId = (movieId) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`http://localhost:3000/movies_genres?movieId=${movieId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Getting movies-genres relationships.\n${error.Error}`);
                reject([]);
            });
    });
};

var _getMovieGenreRelationshipsByGenreId = (genreId) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`http://localhost:3000/movies_genres?genreId=${genreId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Getting movies-genres relationships.\n${error.Error}`);
                reject([]);
            });
    });
};

export {
    addMoviesToGenre,
    addGenresToMovie,
    deleteGenreMovies,
    getMoviesDataByGenreId,
    getGenresDataByMovieId
};