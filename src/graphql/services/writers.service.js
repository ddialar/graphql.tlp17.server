import axios from 'axios';
import * as utils  from '../shared/utils';

var getWritersDataFromMovieRelationships = (relationships) => {
    let writerIds = [];
    let queryParams = [];

    writerIds = _getWriterIdsFromMovieRelationships(relationships);

    queryParams = utils.createQueryParamsString(writerIds, 'id');

    return getWritersData(queryParams);
};

var _getWriterIdsFromMovieRelationships = (relationships) => {
    return relationships.map((writerRelationship) => {
        return writerRelationship.writerId;
    });
};

var getWritersData = (queryParams) => {
    return axios
        .get('http://localhost:3000/writers/' + ((queryParams) ? queryParams : ''))
        .then((response) => {
            console.log('[ WRITERS ] - data\n', response.data);
            return response.data;
        })
        .catch((error) => {
            console.error(`[ ERROR ] - Getting writers' data.\n${error.Error}`);
            return [];
        });
};

var persistNewWriter = (writerData) => {
    return new Promise((resolve, reject) => {
        axios
            .post('http://localhost:3000/writers', writerData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Persisting new writer's data.\n${error}`);
                reject({});
            });
    });
};

var updateWriter = (writerData) => {
    return new Promise((resolve, reject) => {
        axios
            .patch(`http://localhost:3000/writers/${writerData.id}`, writerData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Updating writer's data.\n${error}`);
                reject({});
            });
    });
};

var deleteWriter = (writerId) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`http://localhost:3000/writers/${writerId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Removing writer with id = ${writerId}.\n${error}`);
                reject({});
            });
    });
};

export {
    persistNewWriter,
    updateWriter,
    deleteWriter,
    getWritersDataFromMovieRelationships,
    getWritersData
};