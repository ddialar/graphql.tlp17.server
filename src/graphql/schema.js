import { GraphQLSchema } from 'graphql';

import RootQueryType from './queries/root.query';

// Tarea 1 - Importar el MutationType.

export default new GraphQLSchema({
    query: RootQueryType
    // Tarea 2 - Definir el campo mutation
});

