import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} from 'graphql';

// En esta fase del proyecto, deberás importar el servicio MoviesDirectorsService para,
// de este modo, poder acceder al método 'getMoviesDataByDirectorId' que nos proporcionará
// la información que solicitamos.

var DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        tarea: 'Añadir el campo movies para poder obtener las películas relacionadas con este director'
    })
});

export default DirectorType;

// Además, también tendrás que importar el objeto tipo MovieType para poder devolver la
// información solicitada en el formato correcto.