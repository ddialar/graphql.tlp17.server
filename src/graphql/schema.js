import { GraphQLSchema } from 'graphql';

import RootQueryType from './queries/root.query';

// Ahora que ya tenemos nuestro primer Objeto Tipo y su correspondiente
// consulta, ha llegado el momento de cumplimentar el shcema que usará
// GrpahQL en nuestro proyecto.

export default new GraphQLSchema({
    query: 'Definir el RootQuery para el esquema actual'
});

