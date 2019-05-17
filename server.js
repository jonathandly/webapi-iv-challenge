const express = require('express');

const Router = require('./router.js');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/posts', Router);

server.get('/', (req, res) => {
    res.send(`
        <h1>webapi-iv-challenge-deployment</h1>
    `);
});

module.exports = server;
