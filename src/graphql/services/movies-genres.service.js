import axios from 'axios';

import * as CommonService from './common.service';

var addGenreMovies = (genreId, newMoviesIds) => {
    return getMovieGenreRelationshipsByGenreId(genreId)
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

var addMovieGenres = (movieId, newGenresIds) => {
    return getMovieGenreRelationshipsByMovieId(movieId)
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
    return getMovieGenreRelationshipsByGenreId(genreId)
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

var getMovieGenreRelationshipsByMovieId = (movieId) => {
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

var getMovieGenreRelationshipsByGenreId = (genreId) => {
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
    addGenreMovies,
    addMovieGenres,
    deleteGenreMovies,
    getMovieGenreRelationshipsByMovieId,
    getMovieGenreRelationshipsByGenreId
};