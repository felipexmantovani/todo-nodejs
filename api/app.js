import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import usuariosRouter from './routes/usuarios';

const app = express();

app.config = config;
app.datasource = datasource(app);
app.set('port', 3001);
app.use(bodyParser.json());

usuariosRouter(app);

export default app;
