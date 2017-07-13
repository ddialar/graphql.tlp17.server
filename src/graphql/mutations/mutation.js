import { GraphQLObjectType } from 'graphql';

import * as ActorsMutation from './actors.mutation';
import * as DirectorsMutation from './directors.mutation';
import * as WritersMutation from './writers.mutation';
import * as GenresMutation from './genres.mutation';
import * as MoviesMutation from './movies.mutation';

var MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addDirector: DirectorsMutation.addDirector,
        updateDirector: DirectorsMutation.updateDirector,
        deleteDirector: DirectorsMutation.deleteDirector,
        addMoviesToDirector: DirectorsMutation.addMoviesToDirector,
        deleteDirectorMovies: DirectorsMutation.deleteDirectorMovies,

        addWriter: WritersMutation.addWriter,
        updateWriter: WritersMutation.updateWriter,
        deleteWriter: WritersMutation.deleteWriter,
        addMoviesToWriter: WritersMutation.addMoviesToWriter,
        deleteWriterMovies: WritersMutation.deleteWriterMovies,

        addActor: ActorsMutation.addActor,
        updateActor: ActorsMutation.updateActor,
        deleteActor: ActorsMutation.deleteActor,
        addMoviesToActor: ActorsMutation.addMoviesToActor,
        deleteActorMovies: ActorsMutation.deleteActorMovies,

        addGenre: GenresMutation.addGenre,
        updateGenre: GenresMutation.updateGenre,
        deleteGenre: GenresMutation.deleteGenre,
        addMoviesToGenre: GenresMutation.addMoviesToGenre,
        deleteGenreMovies: GenresMutation.deleteGenreMovies,

        addMovie: MoviesMutation.addMovie,
        updateMovie: MoviesMutation.updateMovie,
        deleteMovie: MoviesMutation.deleteMovie
    })
});

export default MutationType;
