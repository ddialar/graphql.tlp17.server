/*
En este archivo implementaremos el servidor al que realizaremos peticiones basadas en GraphQL.
*/

import express from 'express';
import expressGraphQL from 'express-graphql';

const app = express();

app.use(
    '/graphql',
    expressGraphQL({
        graphiql: true
    })
);

app.listen(
    4000,
    () => {
        console.log('Server listening on port 4000 ...');
    }
);