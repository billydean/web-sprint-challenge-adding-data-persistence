// we need express
const express = require('express')

// we need our routers
const projectRouter = require('./project/router');
const resourceRouter = require('./resource/router');
const taskRouter = require('./task/router');

// we need the server, and we need to parse json
const server = express();
server.use(express.json());

// we need to use the routers
server.use('/api/projects', projectRouter);
server.use('/api/resources', resourceRouter);
server.use('/api/tasks', taskRouter);

// we need to export the module
module.exports = server;