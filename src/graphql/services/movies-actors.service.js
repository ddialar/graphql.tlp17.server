import axios from 'axios';

import * as CommonService from './common.service';

var addActorMovies = (actorId, newMoviesIds) => {
    return getMovieActorRelationshipsByActorId(actorId)
        .then((relationships) => {
            let persistedMovieIds = relationships
                .map((movieActorPair) => {
                    return movieActorPair.movieId;
                });

            let moviesToBePersisted = newMoviesIds
                .filter((newMovieId) => {
                    return (persistedMovieIds.indexOf(newMovieId) < 0);
                });

            if (moviesToBePersisted) {
                let relationshipsToBePersisted = moviesToBePersisted.map((movieId) => {
                    return { actorId: actorId, movieId: movieId };
                });

                return _persistNewMovieActorRelationships(relationshipsToBePersisted)
                    .then(presistedRelationships => presistedRelationships);
            } else {
                console.log(`[ WARN  ] - No movies are going to be bound with the actor with id ${actorId}`); 
                return [];
            }
        })
        .catch(() => {
            return [];
        });
};

var addMovieActors = (movieId, newActorsIds) => {
    return getMovieActorRelationshipsByMovieId(movieId)
        .then((relationships) => {
            let persistedActorIds = relationships
                .map((movieActorPair) => {
                    return movieActorPair.actorId;
                });

            let actorIdsToBePersisted = newActorsIds
                .filter((newActorId) => {
                    return (persistedActorIds.indexOf(newActorId) < 0);
                });

            if (actorIdsToBePersisted) {
                let relationshipsToBePersisted = actorIdsToBePersisted.map((actorId) => {
                    return { actorId: actorId, movieId: movieId };
                });

                return _persistNewMovieActorRelationships(relationshipsToBePersisted)
                    .then(presistedRelationships => presistedRelationships);
            } else {
                console.log(`[ WARN  ] - No actors are going to be bound with the movie with id ${movieId}`); 
                return [];
            }
        })
        .catch(() => {
            return [];
        });
};

var _persistNewMovieActorRelationships = (relationshipsToBePersisted) => {
    let asyncRequests = CommonService.generateAsyncPostRequests('movies_actors', relationshipsToBePersisted);
    return CommonService.runAllAsyncRequests(asyncRequests, 'Persisting movie-actor relationships');
};

var deleteActorMovies = (actorId, moviesIds) => {
    return getMovieActorRelationshipsByActorId(actorId)
        .then((relationships) => {
            let relationshipIdsToBeDeleted = relationships
                .filter((movieActorPair) => {
                    return (moviesIds.indexOf(movieActorPair.movieId) >= 0);
                })
                .map((movieActorPairToBeDeleted) => {
                    return movieActorPairToBeDeleted.id;
                });

            if (relationshipIdsToBeDeleted) {
                return _deleteMovieActorRelationships(relationshipIdsToBeDeleted)
                    .then(presistedRelationships => presistedRelationships);
            } else {
                console.log(`[ WARN  ] - No movie-actor relationships are going to be deleted for the actor with id ${actorId}`); 
                return [];
            }
        })
        .catch(() => {
            return [];
        });
};

var _deleteMovieActorRelationships = (relationshipIdsToBeDeleted) => {
    let asyncRequests = CommonService.generateAsyncDeleteRequests('movies_actors', relationshipIdsToBeDeleted);
    return CommonService.runAllAsyncRequests(asyncRequests, 'Deleting movie-actor relationships');
};

var getMovieActorRelationshipsByMovieId = (movieId) => {
    return axios
        .get(`http://localhost:3000/movies_actors?movieId=${movieId}`)
        .then(response => response.data)
        .catch((error) => {
            console.error(`[ ERROR ] - Getting movie-actor relationships for movie ID = ${movieId}\n`, error); 
            return [];
        });
};

var getMovieActorRelationshipsByActorId = (actorId) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`http://localhost:3000/movies_actors?actorId=${actorId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Getting movies-actors relationships.\n${error.Error}`);
                reject([]);
            });
    });
};

export {
    addActorMovies,
    addMovieActors,
    deleteActorMovies,
    getMovieActorRelationshipsByMovieId,
    getMovieActorRelationshipsByActorId
};