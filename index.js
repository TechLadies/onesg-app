/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const morgan = require('morgan');

/* routers */
const homeRouter = require('./routers');
const userRouter = require('./routers/users');
const healthRouter = require('./routers/healthcheck');

const app = express();

/* port number */
const port = 3000;

/* cors, bodyparser and morgan */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // should limit to onesg-web
  res.header('Access-Control-Allow-Headers', '*');
  if (req.methods === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
