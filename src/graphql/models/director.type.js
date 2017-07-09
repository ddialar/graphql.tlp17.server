import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} from 'graphql';

// En esta fase del proyecto, debes definir los campos (fields) del objeto tipo DirectorType,
// siguiendo las indicaciones dadas en la pantalla.

var DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { tarea: 'Definir el tipo de dato (entero) para este campo' },
        name: { tarea: 'Definir el tipo de dato (string) para este campo' }
    })
});

export default DirectorType;