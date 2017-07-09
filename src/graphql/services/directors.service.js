import axios from 'axios';
import * as utils  from '../shared/utils';

var getDirectorsDataFromMovieRelationships = (relationships) => {
    let directorIds = [];
    let queryParams = [];

    directorIds = _getDirectorIdsFromMovieRelationships(relationships);

    queryParams = utils.createQueryParamsString(directorIds, 'id');

    return getDirectorsData(queryParams);
};

var _getDirectorIdsFromMovieRelationships = (relationships) => {
    return relationships.map((directorRelationship) => {
        return directorRelationship.directorId;
    });
};

var getDirectorsData = (queryParams) => {
    return axios
        .get('http://localhost:3000/directors/' + ((queryParams) ? queryParams : ''))
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(`[ ERROR ] - Getting directors' data.\n${error}`);
            return [];
        });
};

var persistNewDirector = (directorData) => {
    return new Promise((resolve, reject) => {
        axios
            .post('http://localhost:3000/directors', directorData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Persisting new director's data.\n${error}`);
                reject({});
            });
    });
};

var updateDirector = (directorData) => {
    return new Promise((resolve, reject) => {
        axios
            .patch(`http://localhost:3000/directors/${directorData.id}`, directorData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Updating director's data.\n${error}`);
                reject({});
            });
    });
};

var deleteDirector = (directorId) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`http://localhost:3000/directors/${directorId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Removing director with id = ${directorId}.\n${error}`);
                reject({});
            });
    });
};

export {
    persistNewDirector,
    updateDirector,
    deleteDirector,
    getDirectorsDataFromMovieRelationships,
    getDirectorsData
};