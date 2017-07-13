import {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

// Aquí importaremos los Objetos Tipo que vayamos a emplear.

// Aquí importaremos los servicios que vayamos a emplear.

var addDirector = {
    type: 'Objeto tipo que se va a ver afectado por la mutación',
    args: {
        agumentos: 'que serán usados por la mutación'
    },
    resolve: (parentValues, args) => {
        // Aquí implementaremos el código necesario para llevar a
        // cabo las operaciones propias de la mutación.
    }
};

// var updateDirector = {};

// var deleteDirector = {};

// var addMoviesToDirector = {};

// var deleteDirectorMovies = {};

export {
    addDirector,
    // updateDirector,
    // deleteDirector,
    // addMoviesToDirector,
    // deleteDirectorMovies
};