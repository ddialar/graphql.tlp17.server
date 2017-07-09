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

// En esta fase del proyecto, debes definir qué objeto tipo debe devolver
// la consulta, así como la operación necesaria para obtener dicho objetivo.

var byIdQuery = {
    type: new GraphQLList(DirectorType),
    description: 'List of all stored directors, filtered by their IDs.',
    args: {
        tarea: 'Definir los argumentos que va a recibir la consulta'
    },
    resolve: (parentValues, args) => {

        // Ahora vamos a ver qué recibimos como 'args' cuando hacemos una petición.

        console.log('Received args\n', args);
        return [];
        
        // let queryParams = utils.createQueryParamsString(args.id, 'id');
        // return DirectorsService.getDirectorsData(queryParams);
    }
};

export {
    allQuery,
    byIdQuery
};