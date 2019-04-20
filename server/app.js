import http from 'http';
import morgan from 'morgan';
import express from 'express';
import bodyparser from 'body-parser';
import users from './v1/routes/user';
import loans from './v1/routes/loan';

const app = express();

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//route for users
app.use('/api/v1', users);
app.use('/api/v1', loans);

const server = http.createServer(app);
const port = process.env.PORT || 5500;

server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`listening to server on 127.0.0.1:${port}`);
});

module.exports = app;