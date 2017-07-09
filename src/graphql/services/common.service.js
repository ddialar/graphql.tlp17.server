import axios from 'axios';

var generateAsyncPostRequests = (entity, dataSetToBePosted) => {
    return dataSetToBePosted.map((dataToBePosted) => {
        return axios.post(`http://localhost:3000/${entity}`, dataToBePosted);
    });
};

var generateAsyncDeleteRequests = (entity, dataSetToBeDeleted) => {
    return dataSetToBeDeleted.map((dataToBeDeleteted) => {
        return axios.delete(`http://localhost:3000/${entity}/${dataToBeDeleteted}`);
    });
};

var runAllAsyncRequests = (asyncRequests, errorMessage) => {
    return Promise
        .all(asyncRequests)
        .then(response => response.map((operationResult) => operationResult.data))
        .catch((error) => {
            console.log(`[ ERROR ] - ${errorMessage}\n${error}`);
            return [];
        });
};

export {
    generateAsyncPostRequests,
    generateAsyncDeleteRequests,
    runAllAsyncRequests
};