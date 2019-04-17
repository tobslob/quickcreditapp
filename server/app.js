import http from 'http';
import express from 'express';

const app = express;

const server = http.createServer(app);
const port = process.env.PORT || 5500;

server.listen(port, () => {
    console.log(`listening to server on 127.0.0.1:${port}`)
})

module.exports = app;