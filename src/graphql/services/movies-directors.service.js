import axios from 'axios';

import * as MoviesService from './movies.service';
import * as DirectorsService from './directors.service';
import * as CommonService from './common.service';

var addMoviesToDirector = (directorId, newMoviesIds) => {
    return _getMovieDirectorRelationshipsByDirectorId(directorId)
        .then((relationships) => {
            let persistedMovieIds = relationships
                .map((movieDirectorPair) => {
                    return movieDirectorPair.movieId;
                });

            let moviesIdsToBePersisted = newMoviesIds
                .filter((newMovieId) => {
                    return (persistedMovieIds.indexOf(newMovieId) < 0);
                });

            if (moviesIdsToBePersisted) {
                let relationshipsToBePersisted = moviesIdsToBePersisted.map((movieId) => {
                    return { directorId: directorId, movieId: movieId };
                });

                return _persistNewMovieDirectorRelationships(relationshipsToBePersisted)
                    .then(presistedRelationships => presistedRelationships);
            } else {
                console.log(`[ WARN  ] - No movies are going to be bound with the director with id ${directorId}`); 
                return [];
            }
        })
        .catch(() => {
            return [];
        });
};

var addDirectorsToMovie = (movieId, directorsIds) => {
    return _getMovieDirectorRelationshipsByMovieId(movieId)
        .then((relationships) => {
            let persistedDirectorIds = relationships
                .map((directorMoviePair) => {
                    return directorMoviePair.directorId;
                });

            let directorIdsToBePersisted = directorsIds
                .filter((newDirectorId) => {
                    return (persistedDirectorIds.indexOf(newDirectorId) < 0);
                });

            if (directorIdsToBePersisted) {
                let relationshipsToBePersisted = directorIdsToBePersisted.map((directorId) => {
                    return { directorId: directorId, movieId: movieId };
                });

                return _persistNewMovieDirectorRelationships(relationshipsToBePersisted)
                    .then(presistedRelationships => presistedRelationships);
            } else {
                console.log(`[ WARN  ] - No directors are going to be bound with the movie with id ${movieId}`); 
                return [];
            }
        })
        .catch(() => {
            return [];
        });
};

var _persistNewMovieDirectorRelationships = (relationshipsToBePersisted) => {
    let asyncRequests = CommonService.generateAsyncPostRequests('movies_directors', relationshipsToBePersisted);
    return CommonService.runAllAsyncRequests(asyncRequests, 'Persisting movie-director relationships');
};

var deleteDirectorMovies = (directorId, moviesIds) => {
    return _getMovieDirectorRelationshipsByDirectorId(directorId)
        .then((relationships) => {
            let relationshipIdsToBeDeleted = relationships
                .filter((movieDirectorPair) => {
                    return (moviesIds.indexOf(movieDirectorPair.movieId) >= 0);
                })
                .map((movieDirectorPairToBeDeleted) => {
                    return movieDirectorPairToBeDeleted.id;
                });

            if (relationshipIdsToBeDeleted) {
                return _deleteMovieDirectorRelationships(relationshipIdsToBeDeleted)
                    .then(presistedRelationships => presistedRelationships);
            } else {
                console.log(`[ WARN  ] - No movie-director relationships are going to be deleted for the director with id ${directorId}`); 
                return [];
            }
        })
        .catch(() => {
            return [];
        });
};

var _deleteMovieDirectorRelationships = (relationshipIdsToBeDeleted) => {
    let asyncRequests = CommonService.generateAsyncDeleteRequests('movies_directors', relationshipIdsToBeDeleted);
    return CommonService.runAllAsyncRequests(asyncRequests, 'Deleting movie-director relationships');
};

var getMoviesDataByDirectorId = (directorId) => {
    return _getMovieDirectorRelationshipsByDirectorId(directorId)
        .then((relationships) => {
            return MoviesService.getRelatedMovies(relationships);
        })
        .catch((error) => {
            return error;
        });
};

var getDirectorsDataByMovieId = (movieId) => {
    return _getMovieDirectorRelationshipsByMovieId(movieId)
        .then((relationships) => {
            return DirectorsService.getDirectorsDataFromMovieRelationships(relationships);
        })
        .catch((error) => {
            return error;
        });
};

var _getMovieDirectorRelationshipsByMovieId = (movieId) => {
    return axios
        .get(`http://localhost:3000/movies_directors?movieId=${movieId}`)
        .then(response => response.data)
        .catch((error) => {
            console.error(`[ ERROR ] - Getting movie-director relationships for movie ID = ${movieId}\n${error}`); 
            return [];
        });
};

var _getMovieDirectorRelationshipsByDirectorId = (directorId) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`http://localhost:3000/movies_directors?directorId=${directorId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Getting movies-directors relationships.\n${error.Error}`);
                reject([]);
            });
    });
};

export {
    addMoviesToDirector,
    addDirectorsToMovie,
    deleteDirectorMovies,
    getMoviesDataByDirectorId,
    getDirectorsDataByMovieId
};