import {
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import ActorType from '../models/actor.type';
import * as ActorsService from '../services/actors.service';
import * as MoviesActorsService from '../services/movies-actors.service';

var addActor = {
    type: ActorType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        pincture: { type: GraphQLString },
        born: { type: GraphQLString },
        height: { type: GraphQLFloat },
        country: { type: GraphQLString },
        movies: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: (parentValues, args) => {
        return ActorsService
            .persistNewActor({ name: args.name })
            .then((persistedActorData) => {
                if (args.movies) {
                    return MoviesActorsService
                        .addMoviesToActor(persistedActorData.id, args.movies)
                        .then(() => {
                            return persistedActorData;
                        });
                } else {
                    return persistedActorData;
                }
            })
            .catch((error) => {
                return error;
            });
    }
};

var updateActor = {
    type: ActorType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        pincture: { type: GraphQLString },
        born: { type: GraphQLString },
        height: { type: GraphQLFloat },
        country: { type: GraphQLString }
    },
    resolve: (parentValues, args) => {
        return ActorsService
            .updateActor(args)
            .then((updatedActorData) => {
                return updatedActorData;
            })
            .catch((error) => {
                return error;
            });
    }
};

var deleteActor = {
    type: ActorType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: (parentValues, args) => {
        return ActorsService
            .deleteActor(args.id)
            .then((deletedActorData) => {
                return deletedActorData;
            })
            .catch((error) => {
                return error;
            });
    }
};

var addMoviesToActor = {
    type: ActorType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        movies: { type:new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: (parentValues, args) => {
        return MoviesActorsService
            .addMoviesToActor(args.id, args.movies)
            .then((persistedActorMoviesData) => {
                if (persistedActorMoviesData) {
                    return ActorsService
                        .getActorsData(args.id)
                        .then(actorData => actorData);
                } else {
                    return [];
                }
            })
            .catch((error) => {
                return error;
            });
    }
};

var deleteActorMovies = {
    type: ActorType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        movies: { type:new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: (parentValues, args) => {
        return MoviesActorsService
            .deleteActorMovies(args.id, args.movies)
            .then(() => {
                return ActorsService
                    .getActorsData(args.id)
                    .then(actorData => actorData);
            })
            .catch((error) => {
                return error;
            });
    }
};

export {
    addActor,
    updateActor,
    deleteActor,
    addMoviesToActor,
    deleteActorMovies
};