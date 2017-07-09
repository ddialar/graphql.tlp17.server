import axios from 'axios';
import * as utils  from '../shared/utils';

var getActorsDataFromMovieRelationships = (relationships) => {
    let actorIds = [];
    let queryParams = [];

    actorIds = _getActorIdsFromMovieRelationships(relationships);

    queryParams = utils.createQueryParamsString(actorIds, 'id');

    return getActorsData(queryParams);
};

var _getActorIdsFromMovieRelationships = (relationships) => {
    return relationships.map((movieRelationship) => {
        return movieRelationship.actorId;
    });
};

var getActorsData = (queryParams) => {
    return axios
        .get('http://localhost:3000/actors/' + ((queryParams) ? queryParams : ''))
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(`[ ERROR ] - Getting actors' data.\n${error.Error}`);
            return [];
        });
};

var persistNewActor = (actorData) => {
    return new Promise((resolve, reject) => {
        axios
            .post('http://localhost:3000/actors', actorData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Persisting new actor's data.\n${error}`);
                reject({});
            });
    });
};

var updateActor = (actorData) => {
    return new Promise((resolve, reject) => {
        axios
            .patch(`http://localhost:3000/actors/${actorData.id}`, actorData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Updating actor's data.\n${error}`);
                reject({});
            });
    });
};

var deleteActor = (actorId) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`http://localhost:3000/actors/${actorId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(`[ ERROR ] - Removing actor with id = ${actorId}.\n${error}`);
                reject({});
            });
    });
};

export {
    getActorsDataFromMovieRelationships,
    getActorsData,
    persistNewActor,
    updateActor,
    deleteActor
};