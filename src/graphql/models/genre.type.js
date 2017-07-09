import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} from 'graphql';

var GenreType = new GraphQLObjectType({
    name: 'Genre',
    fields: () => ({
        id: { tarea: 'Definir el tipo de dato (entero) para este campo' },
        name: { tarea: 'Definir el tipo de dato (string) para este campo' }
    })
});

export default GenreType;