import {
    GraphQLList
} from 'graphql';

import DirectorType from '../models/director.type';
import * as DirectorsService from '../services/directors.service';

import * as utils from '../shared/utils';

// En esta fase del proyecto, debes definir qué objeto tipo debe devolver
// la consulta, así como la operación necesaria para obtener dicho objetivo.

var allQuery = {
    type: 'Definir el objeto tipo (DirectorType) que devolverá esta consulta',
    description: 'List of all stored directors.',
    resolve: (parentValues, args) => {
        return 'Devolver la consulta para todos los Directores';
    }
};

export {
    allQuery
};