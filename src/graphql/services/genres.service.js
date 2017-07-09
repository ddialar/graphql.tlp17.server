import axios from 'axios';
import * as utils  from '../shared/utils';

var getGenresDataFromMovieRelationships = (relationships) => {
    let genreIds = [];
    let queryParams = [];

    genreIds = _getGenreIdsFromMovieRelationships(relationships);

    queryParams = utils.createQueryParamsString(genreIds, 'id');

    return getGenresData(queryParams);
};

var _getGenreIdsFromMovieRelationships = (relationships) => {
    return relationships.map((genreRelationship) => {
        return genreRelationship.genreId;
    });
};

var getGenresData = (queryParams) => {
    return axios
        .get('http://localhost:3000/genres/' + ((queryParams) ? queryParams : ''))
        .then((response) => {
            console.log('[ GENRES ] - data\n', response.data);
            return response.data;
        })
        .catch((error) => {
            console.error(`[ ERROR ] - Getting genres' data.\n${error.Error}`);
            return [];
        });
};

var persistNewGenre = (genreData) => {
    return new Promise((resolve, reject) => {
        axios
            .post('http://localhost:3000/genres', genreData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Persisting new genre's data.\n${error}`);
                reject({});
            });
    });
};

var updateGenre = (genreData) => {
    return new Promise((resolve, reject) => {
        axios
            .patch(`http://localhost:3000/genres/${genreData.id}`, genreData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Updating genre's data.\n${error}`);
                reject({});
            });
    });
};

var deleteGenre = (genreId) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`http://localhost:3000/genres/${genreId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Removing genre with id = ${genreId}.\n${error}`);
                reject({});
            });
    });
};

export {
    getGenresDataFromMovieRelationships,
    getGenresData,
    persistNewGenre,
    updateGenre,
    deleteGenre
};