/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */
// Built-in modules
const http = require('http');
const https = require('https');

// Third-party modules
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const morgan = require('morgan');

// Custom modules
const { SERVER_CONFIG } = require('./config/env');

/* routers */
const homeRouter = require('./routers');
const userRouter = require('./routers/users');
const healthRouter = require('./routers/healthcheck');

/**
 * Express server set up
 */
const app = express();
const server = SERVER_CONFIG.USE_HTTPS
  ? https.createServer(SERVER_CONFIG.HTTPS_OPTIONS, app)
  : http.createServer(app);

// TODO: add handler to force HTTPS redirects for unsecure connection requests if USE_HTTPS is true

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // should limit to onesg-web
  res.header('Access-Control-Allow-Headers', '*');
  if (req.methods === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


// Body Parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Logger
app.use(morgan('dev'));

/* 
app.use(
  cors({
    origin: 'http://localhost:3000', // should limit to onesg-web
  })
);
*/

/* link to routers (routes which should handle requests) */
app.use('/', homeRouter);
app.use('/api/users', userRouter);
app.use('/api/healthcheck', healthRouter);


/**
 * Start listening to connection requests made on specified PORT
 */
server.listen(SERVER_CONFIG.PORT, () => {
  console.log(
    `OneSG API SErver listening at http://${SERVER_CONFIG.HOSTNAME}:${SERVER_CONFIG.PORT}`
  );
});
