//Express, morgan. 
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');// Me traigo todas las rutas (menos la landing-page).
// const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const setHeaders = require('./middlewares/setHeader');

require('./db.js');

const server = express();

server.name = 'API';

// MIDDLEWARES
server.use(express.urlencoded({ extended: true, limit: '50mb' }));// JsonParser
server.use(express.json({ limit: '50mb' }));// Para que tome a json.
server.use(morgan('dev'));// Da un Output en la consola por c/ request.
server.use(cookieParser());
server.use(setHeaders);

// CONTROL DE ERRORES - Endeware
server.use(errorHandler);

// LANDING PAGE
server.get('/', (req, res) => {
  res.send("Food APP :P")
})

// ROUTES
server.use('/api', routes);

module.exports = server;
