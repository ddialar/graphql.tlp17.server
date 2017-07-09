import {
    GraphQLInt,
    GraphQLList,
} from 'graphql';

import ActorType from '../models/actor.type';
import * as ActorsService from '../services/actors.service';
import * as utils from '../shared/utils';

var allQuery = {
    type: new GraphQLList(ActorType),
    description: 'List of all stored actors.',
    resolve: (parentValues, args) => {
        return ActorsService.getActorsData();
    }
};

var byIdQuery = {
    type: new GraphQLList(ActorType),
    description: 'List of all stored actors.',
    args: {
        id: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: (parentValues, args) => {
        let queryParams = utils.createQueryParamsString(args.id, 'id');
        return ActorsService.getActorsData(queryParams);
    }
};

export {
    allQuery,
    byIdQuery
};