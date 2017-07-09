// En esta parte del taller y una vez visto cómo se implementan campos basado en
// objetos tipo definidos por ti, tendrás que añadir los campos 'directors',
// 'writers', 'actors' y 'genres' al objeto tipo MovieType.

import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString
} from 'graphql';

// Tarea 1 - Importar el servicio 'MoviesDirectorsService'
// Tarea 2 - Importar el servicio 'MoviesWritersService'
// Tarea 3 - Importar el servicio 'MoviesActorsService'
// Tarea 4 - Importar el servicio 'MoviesGenresService'

var MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        poster_image: { type: GraphQLString },
        duration: { type: GraphQLInt },
        rating: { type: GraphQLFloat },
        classification: { type: GraphQLString },
        year: { type: GraphQLString }
        // Tarea 1 - Añadir el campo 'directors' y devolver la información correspondiente.
        // Tarea 2 - Añadir el campo 'writers' y devolver la información correspondiente.
        // Tarea 3 - Añadir el campo 'actors' y devolver la información correspondiente.
        // Tarea 4 - Añadir el campo 'genres' y devolver la información correspondiente.
    })
});

export default MovieType;

// Tarea 1 - Importa el objeto tipo 'DirectorType'.
// Tarea 2 - Importa el objeto tipo 'WriterType'.
// Tarea 3 - Importa el objeto tipo 'ActorType'.
// Tarea 4 - Importa el objeto tipo 'GenreType'.