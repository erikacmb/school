const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const server = express();

mongoose.connect('mongodb+srv://dev2dev_dev-admin-school:TjWaUdzAoyaAX1dV@school-hquzz.mongodb.net/school?retryWrites=true&w=majority', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(console.log('Connected to MongoDB'));

server.use(express.json());
server.use(routes);
server.listen(3333);