var createQueryParamsString = (listOfValues, queryParamVariable) => {
    if (listOfValues && queryParamVariable) {
        return listOfValues.reduce((previousValue, currentValue, index, array) => {
            return ((previousValue) ? previousValue : previousValue) + ((index > 0) ? `&${queryParamVariable}=` : '') + currentValue;
        }, `?${queryParamVariable}=`);
    } else {
        console.error('[ ERROR ] - There was an error creating the query params');
        return '';
    }
};

export {
    createQueryParamsString
};