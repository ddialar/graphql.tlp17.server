import {
    GraphQLList,
    GraphQLInt
} from 'graphql';

import GenreType from '../models/genre.type';
import * as GenresService from '../services/genres.service';

import * as utils from '../shared/utils';

var allQuery = {
    type: new GraphQLList(GenreType),
    description: 'List of all stored genres.',
    resolve: (parentValues, args) => {
        return 'Devolver la información solicitada';
    }
};

var byIdQuery = {
    type: new GraphQLList(GenreType),
    description: 'List of all stored genres, filtered by their IDs.',
    args: {
        tarea: 'Definir el argumento que va a recibir la petición'
    },
    resolve: (parentValues, args) => {
        // Tarea: Obtener los queryParams para solicitar los datos necesarios.
        return 'Devolver la información solicitada';
    }
};

export {
    allQuery,
    byIdQuery
};