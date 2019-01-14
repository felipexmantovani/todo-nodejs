import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import usuariosRouter from './routes/usuarios';
import loginRouter from './routes/login';
import authorization from './auth';

const app = express();

app.config = config;
app.datasource = datasource(app);
app.set('port', 3001);
app.use(bodyParser.json());

const auth = authorization(app);
app.use(auth.initialize());
app.auth = auth;

usuariosRouter(app);
loginRouter(app);

export default app;
