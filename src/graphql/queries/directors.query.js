import {
    GraphQLList,
    GraphQLInt
} from 'graphql';

import DirectorType from '../models/director.type';
import * as DirectorsService from '../services/directors.service';

import * as utils from '../shared/utils';

var allQuery = {
    type: new GraphQLList(DirectorType),
    description: 'List of all stored directors.',
    resolve: (parentValues, args) => {
        return DirectorsService.getDirectorsData();
    }
};

var byIdQuery = {
    type: new GraphQLList(DirectorType),
    description: 'List of all stored directors, filtered by their IDs.',
    args: {
        id: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: (parentValues, args) => {
        let queryParams = utils.createQueryParamsString(args.id, 'id');
        return DirectorsService.getDirectorsData(queryParams);
    }
};

export {
    allQuery,
    byIdQuery
};