import express from 'express';
import expressGraphQL from 'express-graphql';

import schema from './graphql/schema';

const app = express();

// Como paso final antes de poder realizar nuestra primera consulta,
// debemos decirle al middleware de GrpahQL qué shcema vamos a usar.

app.use(
    '/graphql',
    expressGraphQL({
        graphiql: true,
        schema: 'Añadir el shcema del proyecto aquí'
    })
);

app.listen(
    4000,
    () => {
        console.log('Server listening on port 4000 ...');
    }
);