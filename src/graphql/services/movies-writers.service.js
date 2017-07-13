import axios from 'axios';

import * as MoviesService from './movies.service';
import * as WritersService from './writers.service';
import * as CommonService from './common.service';

var addMoviesToWriter = (writerId, newMoviesIds) => {
    return _getMovieWriterRelationshipsByWriterId(writerId)
        .then((relationships) => {
            let persistedMovieIds = relationships
                .map((movieWriterPair) => {
                    return movieWriterPair.movieId;
                });

            let moviesIdsToBePersisted = newMoviesIds
                .filter((newMovieId) => {
                    return (persistedMovieIds.indexOf(newMovieId) < 0);
                });

            if (moviesIdsToBePersisted) {
                let relationshipsToBePersisted = moviesIdsToBePersisted.map((movieId) => {
                    return { writerId: writerId, movieId: movieId };
                });

                return _persistNewMovieWriterRelationships(relationshipsToBePersisted)
                    .then(presistedRelationships => presistedRelationships);
            } else {
                console.log(`[ WARN  ] - No movies are going to be bound with the writer with id ${writerId}`); 
                return [];
            }
        })
        .catch(() => {
            return [];
        });
};

var addWritersToMovie = (movieId, newWritesIds) => {
    return _getMovieWriterRelationshipsByMovieId(movieId)
        .then((relationships) => {
            let persistedWriterIds = relationships
                .map((movieWriterPair) => {
                    return movieWriterPair.writerId;
                });

            let writerIdsToBePersisted = newWritesIds
                .filter((newWritesId) => {
                    return (persistedWriterIds.indexOf(newWritesId) < 0);
                });

            if (writerIdsToBePersisted) {
                let relationshipsToBePersisted = writerIdsToBePersisted.map((writerId) => {
                    return { writerId: writerId, movieId: movieId };
                });

                return _persistNewMovieWriterRelationships(relationshipsToBePersisted)
                    .then(presistedRelationships => presistedRelationships);
            } else {
                console.log(`[ WARN  ] - No writers are going to be bound with the movie with id ${movieId}`); 
                return [];
            }
        })
        .catch(() => {
            return [];
        });
};

var _persistNewMovieWriterRelationships = (dataToBePersisted) => {
    let asyncRequests = CommonService.generateAsyncPostRequests('movies_writers', dataToBePersisted);
    return CommonService.runAllAsyncRequests(asyncRequests, 'Persisting movie-writer relationships');
};

var deleteWriterMovies = (writerId, moviesIds) => {
    return _getMovieWriterRelationshipsByWriterId(writerId)
        .then((relationships) => {
            let relationshipIdsToBeDeleted = relationships
                .filter((movieWriterPair) => {
                    return (moviesIds.indexOf(movieWriterPair.movieId) >= 0);
                })
                .map((movieWriterPairToBeDeleted) => {
                    return movieWriterPairToBeDeleted.id;
                });

            if (relationshipIdsToBeDeleted) {
                return _deleteMovieWriterRelationships(relationshipIdsToBeDeleted)
                    .then(presistedRelationships => presistedRelationships);
            } else {
                console.log(`[ WARN  ] - No movie-director relationships are going to be deleted for the writer with id ${writerId}`); 
                return [];
            }
        })
        .catch(() => {
            return [];
        });
};

var _deleteMovieWriterRelationships = (relationshipIdsToBeDeleted) => {
    let asyncRequests = CommonService.generateAsyncDeleteRequests('movies_writers', relationshipIdsToBeDeleted);
    return CommonService.runAllAsyncRequests(asyncRequests, 'Deleting movie-writer relationships');
};

var getMoviesDataByWriterId = (writerId) => {
    return _getMovieWriterRelationshipsByWriterId(writerId)
        .then((relationships) => {
            return MoviesService.getRelatedMovies(relationships);
        })
        .catch((error) => {
            return error;
        });
};

var getWritersDataByMovieId = (movieId) => {
    return _getMovieWriterRelationshipsByMovieId(movieId)
        .then((relationships) => {
            return WritersService.getWritersDataFromMovieRelationships(relationships);
        })
        .catch((error) => {
            return error;
        });
};

var _getMovieWriterRelationshipsByMovieId = (movieId) => {
    return axios
        .get(`http://localhost:3000/movies_writers?movieId=${movieId}`)
        .then(response => response.data)
        .catch((error) => {
            console.error(`[ ERROR ] - Getting movie-writer relationships for movie ID = ${movieId}\n${error}`); 
            return [];
        });
};

var _getMovieWriterRelationshipsByWriterId = (writerId) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`http://localhost:3000/movies_writers?writerId=${writerId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Getting movies-writers relationships.\n${error.Error}`);
                reject([]);
            });
    });
};

export {
    addMoviesToWriter,
    addWritersToMovie,
    deleteWriterMovies,
    getMoviesDataByWriterId,
    getWritersDataByMovieId
};