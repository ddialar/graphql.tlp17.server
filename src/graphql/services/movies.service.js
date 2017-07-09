import axios from 'axios';
import * as utils  from '../shared/utils';

var getRelatedMovies = (relationships) => {
    let moviesIds = [];
    let queryParams = [];

    moviesIds = _getMovieIds(relationships);

    queryParams = utils.createQueryParamsString(moviesIds, 'id');

    return getMoviesData(queryParams);
};

var _getMovieIds = (relationships) => {
    return relationships.map((movieRelationship) => {
        return movieRelationship.movieId;
    });
};

var getMoviesData = (queryParams) => {
    return axios
        .get('http://localhost:3000/movies/' + ((queryParams) ? queryParams : ''))
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(`[ ERROR ] - Getting movies' data.\n${error.Error}`);
            return [];
        });
};

var persistNewMovie = (movieData) => {
    return new Promise((resolve, reject) => {
        axios
            .post('http://localhost:3000/movies', movieData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Persisting new movie's data.\n${error}`);
                reject({});
            });
    });
};

var updateMovie = (movieData) => {
    return new Promise((resolve, reject) => {
        axios
            .patch(`http://localhost:3000/movies/${movieData.id}`, movieData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Updating movie's data.\n${error}`);
                reject({});
            });
    });
};

var deleteMovie = (movieId) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`http://localhost:3000/movies/${movieId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Removing movie with id = ${movieId}.\n${error}`);
                reject({});
            });
    });
};

export {
    persistNewMovie,
    updateMovie,
    deleteMovie,
    getRelatedMovies,
    getMoviesData
};