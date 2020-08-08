import express from 'express';
import routes from './routes';
import cors from 'cors';


const app = express();
app.use(cors())
app.use(express.json()); // para entender o json

app.use(routes);


app.listen(3333)





// yarn init -y
// yarn add typescript -D
// yarn tsc --init
// ir no target e colocar es2017
// yarn add ts-node-dev -D
// yarn add express
// yarn add @types/express -D
// yarn add knex sqlite3
// yarn add cors // para que meu front end consiga utilizar em outro lugar
//yarn add @types/cors -D
//-----------------//

// GET: listar
// POST: criar
// PUT: atualizar
// DELETE: deletar

