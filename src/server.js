import express from 'express';
import expressGraphQL from 'express-graphql';

import schema from './graphql/schema';

const app = express();

app.use(
    '/graphql',
    expressGraphQL({
        graphiql: true,
        schema: schema
    })
);

app.listen(
    4000,
    () => {
        console.log('Server listening on port 4000 ...');
    }
);