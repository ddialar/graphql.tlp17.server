import {
    GraphQLInt,
    GraphQLList,
} from 'graphql';

import WriterType from '../models/writer.type';
import * as WritersService from '../services/writers.service';

import * as utils from '../shared/utils';

var allQuery = {
    type: new GraphQLList(WriterType),
    description: 'List of all stored writers.',
    resolve: (parentValues, args) => {
        return WritersService.getWritersData();
    }
};

var byIdQuery = {
    type: new GraphQLList(WriterType),
    description: 'List of all stored writers.',
    args: {
        id: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: (parentValues, args) => {
        let queryParams = utils.createQueryParamsString(args.id, 'id');
        return WritersService.getWritersData(queryParams);
    }
};

export {
    allQuery,
    byIdQuery
};